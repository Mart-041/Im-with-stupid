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
    <main
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <h1>I’m with Stupid – Runde {round}</h1>
      <p>Bitte beantworte alle 5 Fragen. Andere sehen deine Antworten nicht.</p>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Dein Sportforen-Name :</label>
          <br />
          <input
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            required
            placeholder="z. B. MaxPower"
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            1. In welches Land würdet ihr aktuell auf keinen Fall reisen!
          </label>
          <br />
          <input
            required
            value={q.q1}
            onChange={(e) =>
              setQ((prev) => ({ ...prev, q1: e.target.value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
2. Welche Person nimmst du aus dem Forum mit, wenn du doch in das Land aus Frage 1 reisen musst?
          </label>
          <br />
          <input
            required
            value={q.q2}
            onChange={(e) =>
              setQ((prev) => ({ ...prev, q2: e.target.value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
           3. Welches Kacktor aus dem Video war am Kackigsten?
          </label>
          <br />
          <input
            required
            value={q.q3}
            onChange={(e) =>
              setQ((prev) => ({ ...prev, q3: e.target.value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
4. Nenne eine berühmte Person, auf die ein Attentat oder mehrere Attentate verübt worden sind. Egal ob diese "erfolgreich" waren oder nicht.



          </label>
          <br />
          <input
            required
            value={q.q4}
            onChange={(e) =>
              setQ((prev) => ({ ...prev, q4: e.target.value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>5. Welcher Teil ist/war das beste FIFA Videospiel aller Zeiten? </label>
          <br />
          <input
            required
            value={q.q5}
            onChange={(e) =>
              setQ((prev) => ({ ...prev, q5: e.target.value }))
            }
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" disabled={sent}>
          {sent ? "Gesendet" : "Abschicken"}
        </button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </main>
  );
}

