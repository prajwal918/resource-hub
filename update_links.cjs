const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const oldLinkBlock = `      <a 
        href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: "inline-block", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)" }}
      >
        <h2 style={{ marginBottom: "10px" }}>🔐 Secure Admin Folder</h2>
        <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Click here to open the Google Drive folder.</p>
      </a>`;

const newLinkBlock = `      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <a 
          href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ flex: 1, minWidth: "250px", maxWidth: "350px", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)", transition: "transform 0.2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
          onMouseOut={e => e.currentTarget.style.transform = "none"}
        >
          <h2 style={{ marginBottom: "10px" }}>🔐 Admin Folder 1</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Primary Google Drive folder.</p>
        </a>

        <a 
          href="https://drive.google.com/drive/folders/1o9tzT5rXV3LKC0CnVdu_H35ecrRRa5LM?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ flex: 1, minWidth: "250px", maxWidth: "350px", padding: "30px", background: "var(--yellow)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)", transition: "transform 0.2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
          onMouseOut={e => e.currentTarget.style.transform = "none"}
        >
          <h2 style={{ marginBottom: "10px" }}>📎 Admin Folder 2</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Secondary Google Drive folder.</p>
        </a>
      </div>`;

// Use replace but note that PowerShell might mess up the emojis if not careful, but node reads utf8.
// We can just use standard indexOf and slice.

const startIdx = code.indexOf('<a \n        href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing"');
if (startIdx !== -1) {
    const endIdx = code.indexOf('</a>', startIdx) + 4;
    code = code.slice(0, startIdx) + newLinkBlock + code.slice(endIdx);
    fs.writeFileSync('src/App.jsx', code);
    console.log("Updated links");
} else {
    console.log("Could not find the link block");
}
