const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const adminComponent = `
function AdminView() {
  const [pin, setPin] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  const [error, setError] = React.useState(false);

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
          <button type="submit" style={{ display: "block", margin: "20px auto", padding: "10px 20px", background: "var(--ink)", color: "#fff", fontWeight: "bold", border: "2px solid var(--ink)" }}>Unlock</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>Incorrect PIN</p>}
      </div>
    );
  }

  return (
    <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>ADMIN DASHBOARD</h1>
      <p style={{ marginBottom: "30px", color: "var(--ink-2)" }}>Manage your global resources here.</p>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <a 
          href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ flex: 1, minWidth: "250px", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)" }}
        >
          <h2 style={{ marginBottom: "10px" }}>📄 Question Papers</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px" }}>Access the master folder containing all previous year question papers.</p>
        </a>

        <a 
          href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ flex: 1, minWidth: "250px", padding: "30px", background: "var(--yellow)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)" }}
        >
          <h2 style={{ marginBottom: "10px" }}>📝 Notes Section</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px" }}>Access the master folder containing all study notes and materials.</p>
        </a>
      </div>
    </div>
  );
}

`;

code = code.replace("/* =====================================================================", adminComponent + "/* =====================================================================");

// Add openAdmin
const openBeyondIdx = code.indexOf("const openBeyond = useCallback(");
code = code.slice(0, openBeyondIdx) + `
  const openAdmin = useCallback(() => {
    setView("admin");
    setCourseId(null);
    setSearch("");
    window.scrollTo(0, 0);
  }, []);
` + code.slice(openBeyondIdx);

// Render AdminView
const renderBeyondIdx = code.indexOf("{view === \"beyond\" && (");
code = code.slice(0, renderBeyondIdx) + `
          {view === "admin" && (
            <AdminView />
          )}
          ` + code.slice(renderBeyondIdx);

// Add button to Topbar
const topBarIdx = code.indexOf("<ProgressChip done={done} total={total}");
code = code.slice(0, topBarIdx) + `
          <button onClick={openAdmin} style={{ padding: "6px 10px", background: "var(--ink)", color: "#fff", fontWeight: "bold", border: "2px solid var(--ink)", fontSize: "11px", display: "flex", alignItems: "center", gap: "5px" }}>
            ADMIN
          </button>
          ` + code.slice(topBarIdx);

fs.writeFileSync('src/App.jsx', code);
