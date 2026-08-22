const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Extract the COURSE_ORDER to iterate over courses
// We know it's in the file, but we can just use Object.keys(COURSES) or hardcode the keys if needed. Wait, COURSE_ORDER is not in the file?
// Ah! In the original view_file, I saw:
// visible = useMemo(() => COURSE_ORDER.filter(...)
// So COURSE_ORDER is defined!

const newAdminComponent = `
function AdminView() {
  const [pin, setPin] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [adminMode, setAdminMode] = React.useState("main"); // main | qp | qp-college | qp-other

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === "9731") {
      setAuth(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  if (!auth) {
    return (
      <div className="admin-view" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Admin Access</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="PIN"
            style={{ padding: "10px", fontSize: "18px", letterSpacing: "5px", width: "120px", textAlign: "center", border: "2px solid var(--ink)" }}
          />
          <button type="submit" style={{ display: "block", margin: "20px auto", padding: "10px 20px", background: "var(--ink)", color: "#fff", fontWeight: "bold", border: "2px solid var(--ink)", cursor: "pointer" }}>Unlock</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>Incorrect PIN</p>}
      </div>
    );
  }

  const renderSubjectGrid = (title) => {
    // We map over COURSES object keys
    const keys = Object.keys(COURSES);
    return (
      <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <button onClick={() => setAdminMode("qp")} className="back" style={{ marginBottom: "20px" }}>
          ← BACK TO CATEGORIES
        </button>
        <h1 style={{ marginBottom: "30px", textTransform: "uppercase" }}>{title}</h1>
        
        <div className="grid-courses">
          {keys.map((id, i) => {
            const c = COURSES[id];
            return (
              <a 
                key={id} 
                href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="ccard ccard-enter" 
                style={{ animationDelay: (i * 35) + "ms", textDecoration: "none", color: "var(--ink)" }}
              >
                <div className="ccard-top">
                  <span className="ccard-code">{c.code}</span>
                </div>
                <div className="ccard-name">{c.name}</div>
                <div className="ccard-cat" style={{ marginTop: "auto", paddingTop: "15px" }}>
                  <span style={{ background: "var(--yellow)", padding: "4px 8px", border: "1px solid var(--ink)", fontWeight: "bold", fontSize: "10px" }}>
                    OPEN FOLDER →
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    );
  };

  if (adminMode === "qp-college") return renderSubjectGrid("College QPs");
  if (adminMode === "qp-other") return renderSubjectGrid("Other College QPs");

  if (adminMode === "qp") {
    return (
      <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <button onClick={() => setAdminMode("main")} className="back" style={{ marginBottom: "20px" }}>
          ← BACK TO ADMIN MAIN
        </button>
        <h1 style={{ marginBottom: "30px" }}>QUESTION PAPERS</h1>
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <button 
            onClick={() => setAdminMode("qp-college")}
            style={{ flex: 1, minWidth: "250px", padding: "40px 20px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textAlign: "left", transition: "transform 0.2s" }}
            onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
            onMouseOut={e => e.currentTarget.style.transform = "none"}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>🏛️ College QPs</h2>
            <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Internal exam question papers and resources.</p>
          </button>

          <button 
            onClick={() => setAdminMode("qp-other")}
            style={{ flex: 1, minWidth: "250px", padding: "40px 20px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textAlign: "left", transition: "transform 0.2s" }}
            onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
            onMouseOut={e => e.currentTarget.style.transform = "none"}
          >
            <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>🌍 Other College QPs</h2>
            <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>VTU and external university question papers.</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>ADMIN DASHBOARD</h1>
      <p style={{ marginBottom: "30px", color: "var(--ink-2)" }}>Manage your global resources here.</p>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button 
          onClick={() => setAdminMode("qp")}
          style={{ flex: 1, minWidth: "250px", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textAlign: "left", transition: "transform 0.2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
          onMouseOut={e => e.currentTarget.style.transform = "none"}
        >
          <h2 style={{ marginBottom: "10px" }}>📄 Question Papers</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Manage Internal and External QPs.</p>
        </button>

        <a 
          href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ flex: 1, minWidth: "250px", padding: "30px", background: "var(--yellow)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)", display: "block" }}
        >
          <h2 style={{ marginBottom: "10px" }}>📝 Notes Section</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Access the master folder containing all study notes and materials.</p>
        </a>
      </div>
    </div>
  );
}
`;

// Extract everything before the first function AdminView() and after the end of it.
const startIdx = code.indexOf("function AdminView() {");
const endIdx = code.indexOf("/* =====================================================================", startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + newAdminComponent + code.slice(endIdx);
  fs.writeFileSync('src/App.jsx', code);
  console.log("Successfully replaced AdminView.");
} else {
  console.log("Could not find AdminView in App.jsx");
}

