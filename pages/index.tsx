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
            1: Welches Tor aus dem Video sollte den Puskas Award erhalten?
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
            2: 2. Du kannst mit einem Fingerschnippen dafür sorgen, dass die Person sofort ihr Amt niederlegen muss und keine politische Macht mehr hat. Welche von den drei Personen verliert ihr Amt: Putin, Trump oder Netanjahu?
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
            3: Nenne die beste Schauspielerin aller Zeiten.
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
            4: Wo sollten die Olympischen Sommerspiele 2036 stattfinden?


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
          <label>5: 5. Ihr könnt/müsst/dürft einen der 7 Forenbereiche (Fussball, Basketball, Tennis, Boxen, Wintersport, Weitere Sportarten, Community)
 löschen. Welchen löscht ihr?  </label>
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

