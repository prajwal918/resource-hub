const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Rewrite AdminView to just have the GDrive link.
const newAdminComponent = `
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
          <button type="submit" style={{ display: "block", margin: "20px auto", padding: "10px 20px", background: "var(--ink)", color: "#fff", fontWeight: "bold", border: "2px solid var(--ink)", cursor: "pointer" }}>Unlock</button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>Incorrect PIN</p>}
      </div>
    );
  }

  return (
    <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1>ADMIN DASHBOARD</h1>
      <p style={{ marginBottom: "30px", color: "var(--ink-2)" }}>Welcome to the admin dashboard.</p>
      
      <a 
        href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: "inline-block", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)" }}
      >
        <h2 style={{ marginBottom: "10px" }}>🔐 Secure Admin Folder</h2>
        <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Click here to open the Google Drive folder.</p>
      </a>
    </div>
  );
}

function QpView({ view, setView }) {
  const renderSubjectGrid = (title) => {
    const keys = Object.keys(COURSES);
    return (
      <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <button onClick={() => setView("qp")} className="back" style={{ marginBottom: "20px" }}>
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

  if (view === "qp-college") return renderSubjectGrid("College QPs");
  if (view === "qp-other") return renderSubjectGrid("Other College QPs");

  return (
    <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => setView("home")} className="back" style={{ marginBottom: "20px" }}>
        ← BACK TO HOME
      </button>
      <h1 style={{ marginBottom: "30px" }}>QUESTION PAPERS</h1>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button 
          onClick={() => setView("qp-college")}
          style={{ flex: 1, minWidth: "250px", padding: "40px 20px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textAlign: "left", transition: "transform 0.2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
          onMouseOut={e => e.currentTarget.style.transform = "none"}
        >
          <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>🏛️ College QPs</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Internal exam question papers and resources.</p>
        </button>

        <button 
          onClick={() => setView("qp-other")}
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

`;

// Find where AdminView currently is, and replace it completely with the new ones.
const startIdx = code.indexOf("function AdminView() {");
const endIdx = code.indexOf("/* =====================================================================", startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + newAdminComponent + code.slice(endIdx);
}

// Now we need to modify HomeView.
// First, HomeView definition: function HomeView({ search, progress, onOpen, onOpenBeyond, onClearSearch }) {
// Change to accept onOpenQp and onOpenNotes maybe? Or we can just pass setView.
// Actually, let's just replace HomeView definition to pass setView down, or add openQp function.
const homeViewDef = "function HomeView({ search, progress, onOpen, onOpenBeyond, onClearSearch }) {";
code = code.replace(homeViewDef, "function HomeView({ search, progress, onOpen, onOpenBeyond, onClearSearch, setView }) {");

// Add banners inside HomeView before Beyond banner
const beyondBanner = "{!search && (\n        <button className=\"beyond-banner\" onClick={onOpenBeyond}>";
const newBanners = `
      {!search && (
        <>
          <button className="beyond-banner" onClick={() => setView("qp")} style={{ marginTop: "30px", background: "var(--card)", color: "var(--ink)", borderColor: "var(--ink)" }}>
            <span className="beyond-banner-ic" style={{ background: "var(--paper)" }}>📄</span>
            <span className="beyond-banner-txt">
              <span className="beyond-banner-title">Question Papers</span>
              <span className="beyond-banner-sub" style={{ color: "var(--ink-3)" }}>College QPs and Other College QPs</span>
            </span>
            <span className="beyond-banner-arrow">→</span>
          </button>
          
          <a href="https://drive.google.com/drive/folders/1ImoEaL2ofZGbGsicYpshRxCuWcNev0JE?usp=sharing" target="_blank" rel="noopener noreferrer" className="beyond-banner" style={{ marginTop: "15px", textDecoration: "none", background: "var(--yellow)", color: "var(--ink)", borderColor: "var(--ink)" }}>
            <span className="beyond-banner-ic" style={{ background: "var(--card)" }}>📝</span>
            <span className="beyond-banner-txt">
              <span className="beyond-banner-title">Notes Section</span>
              <span className="beyond-banner-sub" style={{ color: "var(--ink-2)" }}>Access the master folder for all notes</span>
            </span>
            <span className="beyond-banner-arrow" style={{ color: "var(--ink)" }}>→</span>
          </a>
        </>
      )}

      {!search && (
        <button className="beyond-banner" onClick={onOpenBeyond} style={{ marginTop: "15px" }}>
`;

code = code.replace(beyondBanner, newBanners);

// Fix App.jsx rendering to pass setView to HomeView
const homeRender = "<HomeView search={search} progress={progress} onOpen={openCourse} onOpenBeyond={openBeyond} onClearSearch={clearSearch} />";
code = code.replace(homeRender, "<HomeView search={search} progress={progress} onOpen={openCourse} onOpenBeyond={openBeyond} onClearSearch={clearSearch} setView={setView} />");

// Add QpView to the main switch
const adminRenderIdx = code.indexOf("{view === \"admin\" && (");
code = code.slice(0, adminRenderIdx) + `
          {(view === "qp" || view === "qp-college" || view === "qp-other") && (
            <QpView view={view} setView={setView} />
          )}
          ` + code.slice(adminRenderIdx);

fs.writeFileSync('src/App.jsx', code);
console.log("Successfully patched App.jsx for Home integration.");
