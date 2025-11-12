export type GitHubEnv = {
  GH_TOKEN: string;   // Fine-grained PAT mit contents:read/write
  GH_OWNER: string;   // z.B. "dein-user"
  GH_REPO: string;    // z.B. "iws-form"
  GH_BRANCH: string;  // z.B. "main"
};

const GH_API = "https://api.github.com";

export async function readFileShaAndContent(path: string, env: GitHubEnv) {
  const url = `${GH_API}/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/${encodeURIComponent(path)}?ref=${env.GH_BRANCH}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${env.GH_TOKEN}`, Accept: "application/vnd.github+json" } });
  if (res.status === 404) return { sha: null as string | null, content: "" };
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const json = await res.json();
  const content = Buffer.from(json.content, json.encoding).toString("utf8");
  return { sha: json.sha as string, content };
}

export async function upsertFile(path: string, content: string, message: string, sha: string | null, env: GitHubEnv) {
  const url = `${GH_API}/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/${encodeURIComponent(path)}`;
  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: env.GH_BRANCH,
    ...(sha ? { sha } : {})
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${env.GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`GitHub write failed: ${res.status}`);
  return res.json();
}
