import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [player, setPlayer] = useState("");
  const [round, setRound] = useState("1");
  const [q, setQ] = useState({ q1: "", q2: "", q3: "", q4: "", q5: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const p = (router.query.player as string) || "";
    setPlayer(p);
    const r = (router.query.round as string) || "1";
    setRound(r);
  }, [router.query.player, router.query.round]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const payload = { player, round, ...q };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(await res.text());
      setSent(true);
      router.push("/thanks");
    } catch (e: any) {
      setErr(e.message || "Fehler beim Senden");
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>I’m with Stupid – Runde {round}</h1>
      <p>Bitte beantworte alle 5 Fragen. Andere sehen deine Antworten nicht.</p>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Spieler (vorausgefüllt via Link):</label><br/>
          <input value={player} onChange={e => setPlayer(e.target.value)} required placeholder="z. B. MaxPower" style={{ width: "100%" }} />
        </div>

        {([1,2,3,4,5] as const).map(n => (
          <div key={n} style={{ marginBottom: 12 }}>
            <label>Frage {n}:</label><br/>
            <input required value={(q as any)[`q${n}`]} onChange={e => setQ(prev => ({ ...prev, [`q${n}`]: e.target.value }))} style={{ width: "100%" }} />
          </div>
        ))}

        <button type="submit" disabled={sent}>
          {sent ? "Gesendet" : "Abschicken"}
        </button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </main>
  );
}
