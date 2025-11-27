import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [player, setPlayer] = useState("");
  const [round, setRound] = useState("6");
  const [q, setQ] = useState({ q1: "", q2: "", q3: "", q4: "", q5: "" });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const p = (router.query.player as string) || "";
    setPlayer(p);
    const r = (router.query.round as string) || "6";
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
        {/* Spielername */}
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

        {/* Frage 1 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            1. Welches Bier? Alt, Dunkel, Hell, Kölsch, Pils, Weizen... oder oder oder
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

        {/* Frage 2 – mit klickbarem Link */}
        <div style={{ marginBottom: 12 }}>
          <label>
            2. Ihr dürft ein Team aus der aktuellen 3. Liga in Deutschland in die Bundesliga verfrachten. 
            Welches Team nehmt ihr?
            <br />
            <a
              href="https://www.kicker.de/3-liga/tabelle"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.kicker.de/3-liga/tabelle
            </a>
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

        {/* Frage 3 – mit zwei klickbaren Links */}
        <div style={{ marginBottom: 12 }}>
          <label>
            3. Ihr dürft ein Team aus der aktuellen österreichischen Bundesliga ODER der Super League 
            aus der Schweiz in die Bundesliga verfrachten? Welches Team nehmt ihr?
            <br />
            <a
              href="https://www.kicker.de/bundesliga-oesterreich/tabelle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Österreichische Bundesliga Tabelle
            </a>
            <br />
            <a
              href="https://www.kicker.de/super-league-schweiz/tabelle"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schweizer Super League Tabelle
            </a>
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

        {/* Frage 4 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            4. Für den Mai 2026 sind in Las Vegas die Enhanced Games geplant.
            Kurzum: Dort dürfen die Athletinnen und Athleten vollgedopt antreten.
            <br /><br />
            Werdet ihr euch das Event anschauen (1) oder boykottieren (2)?
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

        {/* Frage 5 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            5. Wie lange wird es Sportforen als Forum noch geben?
            <br />
            A) maximal bis 2035 &nbsp;&nbsp;
            B) maximal bis 2045 &nbsp;&nbsp;
            C) maximal bis 2055 &nbsp;&nbsp;
            D) 2056 oder länger
          </label>
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
