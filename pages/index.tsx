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
1. Alle Menschen (tot und lebendig) leben wieder in ihrer Prime. Ihr könnt ein Konzert besuchen eines Künstlers, einer Künstlerin oder einer Band in ihrer Prime? Zu wem geht ihr ins Konzert?
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
2. Nenne einen ehemaligen Hertha-Spieler.
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
           3. Wer von den Teams sollte Deutscher Meister werden, wenn alle ehemaligen deutschen Meister eliminiert wären?
Auswahl für Antworten: 
RB Leipzig, 1899 Hoffenheim, SC Freiburg, Union Berlin, Augsburg, St. Pauli, Mainz, Heidenheim
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
4. Bar oder Karte?
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
5. Was würdet ihr maximal für ein Kino-Ticket bezahlen wollen (nur volle € Beträge ohne Cent)? Das € Zeichen könnt ihr in der Antwort bitte weglassen          <br />
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

