import type { NextApiRequest, NextApiResponse } from "next";
import { readFileShaAndContent, upsertFile, type GitHubEnv } from "@/lib/github";

const CSV_PATH = "data/responses.csv";

// CSV-Helper ohne replaceAll (kompatibel mit älteren Targets)
function csvEscape(value: string) {
  const v = value.replace(/\r/g, " ").replace(/\n/g, " ").trim();
  return /[",;]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const env: GitHubEnv = {
    GH_TOKEN: process.env.GH_TOKEN!,
    GH_OWNER: process.env.GH_OWNER!,
    GH_REPO: process.env.GH_REPO!,
    GH_BRANCH: process.env.GH_BRANCH || "main"
  };

  // Prüfen, ob alle Env-Variablen da sind
  for (const k of ["GH_TOKEN", "GH_OWNER", "GH_REPO"]) {
    if (!(env as any)[k]) return res.status(500).json({ error: `Missing env ${k}` });
  }

  const { player, q1, q2, q3, q4, q5, round } = req.body || {};
  if (!player || !q1 || !q2 || !q3 || !q4 || !q5) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "?";
  const timestamp = new Date().toISOString();

  const row = [
    timestamp,
    round ?? "1",
    player,
    q1, q2, q3, q4, q5,
    ip
  ].map(csvEscape).join(";") + "\n";

  // Datei einlesen oder neu anlegen
  const { sha, content } = await readFileShaAndContent(CSV_PATH, env);
  const header = "timestamp;round;player;q1;q2;q3;q4;q5;ip\n";
  const nextContent = (content.startsWith("timestamp;") ? content : header + (content || "")) + row;

  await upsertFile(CSV_PATH, nextContent, `add response ${player} @ ${timestamp}`, sha, env);
  return res.status(200).json({ ok: true });
}

