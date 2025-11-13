<div style={{ marginBottom: 12 }}>
  <label>
    1. <strong>Nenne einen berühmten politischen Gefangenen aus der Geschichte der Menschheit von Anbeginn der Zeit bis heute.</strong>
  </label><br/>
  <input
    required
    value={q.q1}
    onChange={(e) => setQ((prev) => ({ ...prev, q1: e.target.value }))}
    style={{ width: "100%" }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>
    2. <strong>Gehe auf haft-ddr.de. Dort werden auf einer Karte ehemalige Untersuchungshaftanstalten angezeigt: Nenne eine Haftanstalt/Ort, der dort angezeigt wird.</strong>
  </label><br/>
  <input
    required
    value={q.q2}
    onChange={(e) => setQ((prev) => ({ ...prev, q2: e.target.value }))}
    style={{ width: "100%" }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>
    3. <strong>Welchen inaktiven/ehemaligen Sportforen-User oder Userin vermisst ihr am meisten?</strong>
  </label><br/>
  <input
    required
    value={q.q3}
    onChange={(e) => setQ((prev) => ({ ...prev, q3: e.target.value }))}
    style={{ width: "100%" }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>
    4. <strong>Nenne einen User/eine Userin, die gerne lange Beiträge schreibt.</strong>
  </label><br/>
  <input
    required
    value={q.q4}
    onChange={(e) => setQ((prev) => ({ ...prev, q4: e.target.value }))}
    style={{ width: "100%" }}
  />
</div>

<div style={{ marginBottom: 12 }}>
  <label>
    5. <strong>Wer ist bigger: Hertha oder Bayern?</strong>
  </label><br/>
  <input
    required
    value={q.q5}
    onChange={(e) => setQ((prev) => ({ ...prev, q5: e.target.value }))}
    style={{ width: "100%" }}
  />
</div>
