import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Search, ArrowLeft, ExternalLink, FileText, PlayCircle,
  GraduationCap, ScrollText, Target, Wrench, Zap,
  BookOpen, TerminalSquare, RotateCcw,
  Compass, Cpu, Map, Swords, GitBranch, Users, Award,
  FlaskConical, Briefcase, AlertCircle, CheckCircle2
} from "lucide-react";




function AdminView() {
  const [pin, setPin] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [links, setLinks] = React.useState({ link1: "#", link2: "#" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      
      const data = await res.json();
      if (data.success) {
        setLinks(data.links);
        setAuth(true);
      } else {
        setError(true);
        setPin("");
      }
    } catch (err) {
      setError(true);
      setPin("");
    }
    setLoading(false);
  };

  if (!auth) {
    return (
      <div className="admin-view" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Admin Access</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="password"
            maxLength={10}
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="PIN"
            disabled={loading}
            style={{ padding: "10px", fontSize: "18px", letterSpacing: "5px", width: "250px", textAlign: "center", border: "2px solid var(--ink)" }}
          />
          <button type="submit" disabled={loading} style={{ display: "block", margin: "20px auto", padding: "10px 20px", background: "var(--ink)", color: "#fff", fontWeight: "bold", border: "2px solid var(--ink)", cursor: "pointer" }}>
            {loading ? "Verifying..." : "Unlock"}
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>Incorrect PIN</p>}
      </div>
    );
  }

  return (
    <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1>ADMIN DASHBOARD</h1>
      <p style={{ marginBottom: "30px", color: "var(--ink-2)" }}>Welcome to the admin dashboard.</p>
      
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <a 
          href={links.link1}
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
          href={links.link2}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ flex: 1, minWidth: "250px", maxWidth: "350px", padding: "30px", background: "var(--yellow)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", textDecoration: "none", color: "var(--ink)", transition: "transform 0.2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "translate(-3px, -3px)"}
          onMouseOut={e => e.currentTarget.style.transform = "none"}
        >
          <h2 style={{ marginBottom: "10px" }}>📎 Admin Folder 2</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>Secondary Google Drive folder.</p>
        </a>
      </div>
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

function NotesView({ view, setView }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [selectedFolder, setSelectedFolder] = React.useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/notes', { method: 'GET' });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const renderSubjectGrid = (title) => {
    const keys = Object.keys(COURSES);
    return (
      <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <button onClick={() => setView("notes")} className="back" style={{ marginBottom: "20px" }}>
          BACK TO CATEGORIES
        </button>
        <h1 style={{ marginBottom: "30px", textTransform: "uppercase" }}>{title}</h1>
        
        <div className="grid-courses">
          {keys.map((id, i) => {
            const c = COURSES[id];
            return (
              <button 
                key={id} 
                onClick={() => {
                  setSelectedFolder(`${title} - ${c.code}`);
                  fetchNotes();
                }}
                className="ccard ccard-enter" 
                style={{ animationDelay: (i * 35) + "ms", textDecoration: "none", color: "var(--ink)", textAlign: "left", cursor: "pointer", background: "none", border: "none", padding: 0 }}
              >
                <div className="ccard-top">
                  <span className="ccard-code">{c.code}</span>
                </div>
                <div className="ccard-name">{c.name}</div>
                <div className="ccard-cat" style={{ marginTop: "auto", paddingTop: "15px" }}>
                  <span style={{ background: "var(--yellow)", padding: "4px 8px", border: "1px solid var(--ink)", fontWeight: "bold", fontSize: "10px" }}>
                    OPEN FOLDER  
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  if (selectedFolder) {
    return (
      <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <button onClick={() => { setSelectedFolder(null); setNotes([]); }} className="back" style={{ marginBottom: "20px" }}>
          BACK TO SUBJECTS
        </button>
        <h1 style={{ marginBottom: "10px", textTransform: "uppercase" }}>{selectedFolder}</h1>
        <p style={{ marginBottom: "30px", color: "var(--ink-2)" }}>Directly fetched from AWS S3 Bucket.</p>
        
        {loading ? (
          <p>Loading PDFs from S3...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Failed to load notes from S3.</p>
        ) : notes.length === 0 ? (
          <p>No PDFs found in the S3 bucket.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {notes.map((note, i) => (
              <a 
                key={i}
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", padding: "15px", background: "var(--card)", border: "2px solid var(--border)", textDecoration: "none", color: "var(--ink)" }}
              >
                <div style={{ flex: 1 }}>
                  <strong>{note.key}</strong>
                  <div style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "5px" }}>
                    {(note.size / 1024).toFixed(2)} KB &bull; Modified: {new Date(note.lastModified).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ background: "var(--yellow)", padding: "5px 10px", fontSize: "12px", fontWeight: "bold", border: "1px solid var(--ink)" }}>
                  DOWNLOAD
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (view === "notes-our") return renderSubjectGrid("Our College Notes");
  if (view === "notes-other") return renderSubjectGrid("Other College Notes");

  return (
    <div className="admin-view" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => setView("home")} className="back" style={{ marginBottom: "20px" }}>
        BACK TO HOME
      </button>
      <h1 style={{ marginBottom: "30px" }}>NOTES SECTION</h1>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button 
          onClick={() => setView("notes-our")}
          style={{ flex: 1, minWidth: "250px", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", cursor: "pointer", textAlign: "left" }}
        >
          <h2 style={{ marginBottom: "10px" }}>Our College Notes</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>View notes specific to our college.</p>
        </button>

        <button 
          onClick={() => setView("notes-other")}
          style={{ flex: 1, minWidth: "250px", padding: "30px", background: "var(--card)", border: "3px solid var(--ink)", boxShadow: "var(--sh)", cursor: "pointer", textAlign: "left" }}
        >
          <h2 style={{ marginBottom: "10px" }}>Other College Notes</h2>
          <p style={{ color: "var(--ink-2)", fontSize: "14px", margin: 0 }}>View notes from other colleges.</p>
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   DATA
   Ported verbatim from the source NMAMIT CSE 5th-sem resource hub —
   official syllabus meta, textbooks, and the full 128-entry resource
   index. Nothing here is invented; only the rendering layer below is new.
   ===================================================================== */

const COURSES = {
toc:{code:"CS3103-1",name:"Theory of Computation",cat:"PCC",credits:3,ltp:"3-0-0",hrs:"40",cie:50,see:50,
units:[
{n:1,title:"Automata & Regular Languages",hrs:15,topics:"Why study automata theory; DFA, NFA, application (text search), FA with ε-transitions; Regular expressions, FA↔RE, applications of RE; Proving languages not regular",tb:"T1: Ch1 (1.1,1.5), Ch2 (2.1-2.5), Ch3 (3.1,3.2.2,3.2.3,3.3), Ch4 (4.1)",chapters:[["DFA and NFA","11 lectures"],["Conversion of NFA to DFA","5"],["Minimization of DFA","7"],["Mealy & Moore Machine","14"],["Epsilon NFA","4"],["Regular Expression","13"],["Equivalence of Finite Automata","2"],["Pumping Lemma (Reg. Languages)","3"]]},
{n:2,title:"Regular Lang. Properties, CFG & PDA",hrs:15,topics:"Closure properties, equivalence & minimization of automata; CFG definitions, derivation trees, ambiguity, unambiguous CFG for algebraic expressions; PDA definition, language accepted by PDA",tb:"T1: Ch4 (4.2,4.4), Ch6 (6.1,6.2.1,6.2.2); T2: Ch6 (6.1,6.2,6.4,6.5)",chapters:[["Regular Grammar","9 lectures"],["Context Free Languages","6"],["Pushdown Automata","9"]]},
{n:3,title:"CFL Properties, Turing Machines & Decidability",hrs:10,topics:"Normal forms for CFGs; the Turing machine, extensions to basic TM; recursively enumerable & recursive languages, Chomsky hierarchy",tb:"T1: Ch7 (7.1), Ch8 (8.2,8.4); T2: Ch10 (10.1,10.4)",chapters:[["Chomsky & Greibach Normal Forms","4 lectures"],["Pumping Lemma (CFL)","3"],["Turing Machine","14"],["Undecidability & Conclusion","7"]]}],
chSource:"https://www.nesoacademy.org/cs/04-theory-of-computation",chChannel:"Neso Academy",
textbooks:[["Introduction to Automata Theory, Languages and Computation","Hopcroft, Motwani, Ullman","3rd Ed., Pearson, 2012 (T1)","The definitive text — unmatched rigor on the Pumping Lemma and closure properties. Dense notation; read it slowly."],["Introduction to Languages and The Theory of Computation","John C. Martin","4th Ed., Tata McGraw Hill, 2010 (T2)","Better narrative pace than T1. Especially good for Unit III — Turing machine configurations and recursive vs. r.e. languages."]],
refs:[["An Introduction to Formal Languages and Automata","Peter Linz","5th Ed., Narosa, 2011","Best for a bank of fully solved constructions — use when you're stuck building a state diagram or grammar by hand."],["Introduction to the Theory of Computation","Michael Sipser","3rd Ed., MIT Press, 2014","MIT/UVA's core text. 'Proof-by-idea' style — builds intuition before formal proof. The best single source for Unit III decidability/reducibility."]],
moocs:[["NPTEL — Theory of Automata, Formal Languages and Computation (course 106106049, cited directly in NMAMIT's syllabus) — Prof. Kamala Krithivasan, IIT Madras","http://nptel.ac.in/courses/106106049/"],["MIT OCW 6.045J — Automata, Computability and Complexity","https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-045j-automata-computability-and-complexity-spring-2011/"]],
note:"NMAMIT's own syllabus organizes the course into 3 units, not the 5-module split most VTU/BCS503 notes online use. Content is identical — Unit I ≈ old Modules 1-2, Unit II ≈ tail of Module 2 + Module 3, Unit III ≈ Modules 4-5. Resources below are grouped by the common topic split since that's how almost all external notes/videos are tagged online. Confirmed 2026-08: NPTEL 106106049 is live and taught by Prof. Kamala Krithivasan (IIT Madras) — this is the syllabus-cited course. VTU's own 2022-scheme code for this exact course is BCS503 (confirmed live via vtu.ac.in), which is more current than the older 21CS51/18CS54 archive codes below — both are kept since PYQ archives span multiple scheme years.",
top5:[
["Hopcroft, Motwani & Ullman — Introduction to Automata Theory, Languages, and Computation","Prescribed T1. The academic bible of the subject — essential for the formal, rigorous proofs the SEE actually asks for."],
["Gate Smashers — Theory of Computation YouTube series","Fastest route from abstract theory to exam technique — DFA minimization, CFG simplification, worked step-by-step."],
["JFLAP (Java Formal Languages and Automata Package)","Turns TOC from paper-only math into something you can build and test — draw an automaton, feed it a string, watch it run."],
["GeeksforGeeks Theory of Computation hub","Structured, syllabus-order written notes with integrated GATE PYQs for instant self-check after each topic."],
["NPTEL — Theory of Computation, Prof. Raghunath Tewari (IIT Kanpur)","IIT-caliber depth for the hardest part of the course — undecidability and the limits of computation in Unit III."]],
cheatsheets:[
{title:"Closure Properties Matrix",list:[
"Regular Languages: closed under Union, Intersection, Concatenation, Kleene Star, AND Complement — the only class closed under all five.",
"Context-Free Languages: closed under Union, Concatenation, Kleene Star — NOT closed under Intersection or Complement.",
"A CFL ∩ a Regular language is always context-free (even though CFL ∩ CFL is not guaranteed to be) — a favorite exam/GATE trap."]},
{title:"Subset Construction (NFA → DFA)",body:"Build one new DFA state for every reachable subset of NFA states — worst case 2^Q states. Track ε-closures at every step. Any new DFA state that contains at least one original NFA final state must itself be marked accepting."},
{title:"DFA Minimization (Myhill–Nerode / table-filling)",body:"States p and q are distinguishable if some input string drives one to an accepting state and the other to a rejecting one. Iteratively partition the state set on distinguishability until no partition splits further — what's left is the minimal DFA."},
{title:"Pumping Lemma — the adversary game (memorize this order)",ordered:true,list:[
"Assume, for contradiction, that L is regular.",
"There exists a pumping length p (the adversary picks p, not you).",
"You pick a string w ∈ L with |w| ≥ p.",
"The adversary splits w = xyz with |xy| ≤ p and |y| > 0.",
"You pick i (usually i=0 to pump down or i=2 to pump up) such that xyⁱz ∉ L — contradiction, so L is not regular."]}
],
gateDeepDive:[
{tag:"Unit I · Regular Languages · GATE 2019",q:"For Σ={a,b}, L = {x | x = a^(2+3k) or x = b^(10+12k), k≥0}. Which value can be a valid pumping length for L: 3, 5, 9, or 24?",d:"The pumping length must satisfy the periodicity of both branches at once — take the LCM of the two step sizes (3 and 12) to find the minimum length that lets the cycle repeat without breaking either condition."},
{tag:"Unit II · Context-Free Languages · GATE 2006",q:"L is context-free and M is regular. Is L ∩ M always regular, never regular, always a DCFL, or always context-free?",d:"CFL ∩ CFL isn't guaranteed to stay context-free, but CFL ∩ Regular is always context-free — regularity is 'well-behaved' enough to preserve the CFL closure here. A classic closure-property trap."},
{tag:"Unit III · Computability · GATE 2008",q:"Rank by decidability: DFA equivalence, Turing machine halting, and CFL membership.",d:"Because DFAs are finite, almost every non-trivial property of them is decidable (emptiness, finiteness, equivalence). Almost no non-trivial property of a Turing machine is decidable — that's Rice's Theorem — and the Halting Problem is the canonical example."}
]},

cnc:{code:"CS3001-1",name:"Computer Network and Communication",cat:"IPCC",credits:4,ltp:"3-0-2",hrs:"40+26",cie:50,see:50,
units:[
{n:1,title:"Intro, Physical & Data-Link Layer",hrs:15,topics:"Data communications, network types, connection-oriented vs connectionless; network devices; TCP/IP vs OSI; Physical layer (digital signals, transmission impairment, line coding); guided media, packet switching; Data-link intro, link-layer addressing (up to ARP), error detection (block coding, CRC), MAC (CSMA, CSMA/CD)",tb:"T1",chapters:[["Data Link Layer","64 lectures"]]},
{n:2,title:"Data-Link contd. & Network Layer",hrs:16,topics:"Wired LANs (Ethernet), wireless LAN intro; Network-layer services, packet switching, IPv4/IPv6 addressing & packet format, ICMPv4; routing algorithms up to multicast, congestion control, QoS, internetworking",tb:"T1 Ch 23-26 (see below), T2",chapters:[["Logical Addressing & Subnetting","33 lectures"],["Network Layer Protocols","28"],["Routing Protocols","34"],["NAT & IPv6","10"]]},
{n:3,title:"Transport & Application Layer",hrs:9,topics:"Transport services, port numbers, UDP, TCP; Application layer — client/server, HTTP/WWW, FTP, email, DNS; Telnet/SSH (self-learning)",tb:"T1: Ch23 (23.1.1), Ch24 (24.1.2,24.2,24.3-24.3.6), Ch25 (25.1,25.2), Ch26 (26.1-26.6)",chapters:[["Transport Layer","31 lectures"],["Application Layer & Security","15"]]}],
chSource:"https://nesoacademy.org/cs/06-computer-networks",chChannel:"Neso Academy",
textbooks:[["Data Communications and Networking with TCP/IP Protocol Suite","Behrouz A. Forouzan","6th Ed., McGraw Hill (Indian Ed.), 2022 (T1)"],["Computer Networks","Andrew S. Tanenbaum, David J. Wetherall","6th Ed., Pearson, 2021 (T2)"]],
refs:[["Computer Networking: A Top-Down Approach","Kurose & Ross","8th Ed., Pearson, 2022"],["Data and Computer Communications","William Stallings","10th Ed., Pearson, 2013"],["Computer Networks","Peterson & Davie","5th Ed., Elsevier, 2011"]],
moocs:[["NPTEL — Computer Networks (Prof. Sujoy Ghosh, IIT Kharagpur)","https://nptel.ac.in/courses/106105081"],["NPTEL — Data Communication (Prof. Ajit Pal, IIT Kharagpur)","https://nptel.ac.in/courses/106105082"],["NPTEL via SWAYAM","https://onlinecourses.nptel.ac.in/noc22_ee61/"]],
note:"Official lab is NS-2/NS-3 simulation (Part A, 7 experiments) + C/C++/Python programs (Part B, 7 experiments) — NOT Cisco Packet Tracer/GNS3, which both source dossiers assumed. Keeping Packet Tracer resources below since they're still useful for building intuition, but flagged clearly. Confirmed 2026-08: both NPTEL courses above are live under their named instructors. VTU's 2022-scheme code for this exact course is BCS502 (confirmed via official vtu.ac.in scheme document)."},

os:{code:"CS2004-1",name:"Operating Systems",cat:"IPCC (listed as PCC on its own syllabus page — inconsistent in the source doc itself)",credits:4,ltp:"3-0-2",hrs:"40+26",cie:50,see:50,
units:[
{n:1,title:"OS Structures, Processes & CPU Scheduling",hrs:15,topics:"OS services, user/OS interface, system calls, linkers/loaders; Process concept, scheduling, operations, IPC; Threads & multithreading models; CPU scheduling — criteria, algorithms, thread scheduling",chapters:[["OS Structures","10 lectures"],["Processes","15"],["Threads","5"],["CPU Scheduling","20"]]},
{n:2,title:"Synchronization, Deadlocks & Main Memory",hrs:15,topics:"Critical section problem, Peterson's solution, sync hardware, semaphores, monitors, classical sync problems; Deadlocks — model, characterization, prevention/avoidance/detection/recovery; Main memory — paging, page table structure, swapping",chapters:[["Process Synchronization","16 lectures"],["Deadlocks","21"],["Main Memory","27"]]},
{n:3,title:"Virtual Memory & File Systems",hrs:10,topics:"Demand paging, copy-on-write, page replacement, frame allocation; File system concepts, structure, directory implementation, allocation methods, free space management, disk scheduling",chapters:[["Virtual Memory","29 lectures"],["File Systems","20"],["File System Implementation","16"],["Mass Storage Structure","32"]]}],
chSource:"https://www.nesoacademy.org/cs/03-operating-system",chChannel:"Neso Academy",
textbooks:[["Operating System Concepts","Silberschatz, Gagne, Galvin","12th Ed., Wiley, 2018"]],
refs:[["Operating Systems – A Concept-Based Approach","D.M. Dhamdhere","2nd Ed., Tata McGraw-Hill, 2006"],["An Introduction to Operating Systems: Concepts and Practice","P.C.P. Bhatt","5th Ed., PHI, 2019"],["Operating Systems","Harvey M. Deitel","3rd Ed., Addison Wesley, 1990"]],
moocs:[["Prof. Mythili Vutukuru's OS course, IIT Bombay","https://www.cse.iitb.ac.in/~mythili/os/"],["Prof. Mythili Vutukuru — lecture videos","https://www.youtube.com/@mythilivutukuru6136"]],
note:"Official lab is only 5 experiments: fork()+child processes, a scheduling algorithm, producer-consumer, page replacement, Banker's algorithm — lighter than both dossiers assumed. Confirmed 2026-08: Mythili Vutukuru is IIT Bombay CSE faculty with her own OS course page and a personal YouTube channel of the actual lectures (swapped in below, more precise than a generic aggregator). VTU's 2022-scheme code for Operating Systems is BCS303 — note this sits in VTU's 3rd semester, not 5th; NMAMIT's autonomous scheme moves it later. Treat BCS303 links as a solid content proxy, not a same-semester match.",
top5:[
["Prof. Mythili Vutukuru's OS course page + lecture videos (IIT Bombay)","Straight from the source — an active IIT Bombay professor's own slides and recorded lectures, not a third-party summary."],
["Silberschatz, Galvin & Gagne — Operating System Concepts","Prescribed T1. The 'Dinosaur Book' — still the field's reference for process/memory/file-system fundamentals."],
["GeeksforGeeks Operating Systems hub","Fast, syllabus-ordered notes for every unit with worked examples for scheduling, paging, and deadlock problems."],
["Gate Smashers — Operating Systems playlist","Best for turning theory into exam technique — Gantt charts, page-replacement traces, semaphore code walkthroughs."],
["Banker's Algorithm reference implementation (GfG)","The one lab experiment students most often get wrong under viva pressure — work through a coded example before your viva, not just the theory."]],
cheatsheets:[
{title:"CPU Scheduling — what each algorithm optimizes for",list:[
"FCFS: simplest, but suffers the convoy effect — one long process holds up everyone behind it.",
"SJF/SRTF: minimizes average waiting time (provably optimal), but needs the next burst length predicted, not given.",
"Round Robin: fair and responsive (good for time-sharing), but throughput drops if the time quantum is too small — too much context-switch overhead.",
"Priority scheduling: can starve low-priority processes indefinitely — the standard fix is aging (gradually raising priority the longer a process waits)."]},
{title:"Paging vs. Segmentation — the one-line distinction",body:"Paging splits memory into fixed-size frames — no external fragmentation, but some internal fragmentation (the last page is rarely full). Segmentation splits memory into variable-sized, logically meaningful units (code, stack, heap) — easier to reason about, but reintroduces external fragmentation. Most real systems (x86) combine both: segmented paging."},
{title:"The 4 necessary conditions for deadlock (all 4 must hold)",ordered:true,list:[
"Mutual exclusion — at least one resource is held in a non-shareable mode.",
"Hold and wait — a process holds one resource while waiting for another.",
"No preemption — a resource can't be forcibly taken away; it must be released voluntarily.",
"Circular wait — a closed chain of processes, each waiting on a resource held by the next."]},
{title:"Banker's Algorithm — the safety check, step by step",ordered:true,list:[
"Compute Need = Max − Allocation for every process.",
"Find any process whose Need ≤ Available.",
"'Run' it: add its Allocation back to Available, mark it finished.",
"Repeat until either every process finishes (safe state — record the order as the safe sequence) or no process can proceed (unsafe state)."]}
],
gateDeepDive:[
{tag:"Deadlock avoidance · GATE CS 1996",q:"A system uses the Banker's Algorithm with 3 processes (P0-P2) and 3 resource types (R0-R2) in a given state. (a) Show the system can be in this state. (b) What happens if P0 requests one more unit of R1?",d:"This is the original, most-copied Banker's Algorithm exam question — run the safety algorithm on the given state first (a safe sequence like P1→P2→P0 proves it's safe), then re-run it after granting the request to see if a safe sequence still exists."},
{tag:"Deadlock avoidance · GATE CS 2014",q:"3 processes (P0-P2) share resource types X, Y, Z under the Banker's Algorithm, currently in a safe state. Two independent requests (REQ1, REQ2) arrive — which can be granted without leaving a safe state?",d:"Classic trap: a request can look 'affordable' (enough units are Available) and still be rejected, because granting it destroys every remaining safe sequence. Always re-run the full safety check after a hypothetical grant, never just check Available ≥ Request."},
{tag:"CPU scheduling · classic GATE pattern",q:"Given a set of processes with arrival times and burst times, compute average waiting time under FCFS, SJF, and Round Robin (quantum=2) — and rank the three.",d:"The recurring GATE trap is applying SJF/SRTF as if burst times are always known in advance — in practice they're only used as an idealized best case, since real schedulers must estimate the next burst. Always double-check whether the question means preemptive (SRTF) or non-preemptive (SJF) before building the Gantt chart."}
]},

jsf:{code:"CS3603-1",name:"Java and Spring Framework Lab",cat:"PCC Lab",credits:1,ltp:"0-0-2",hrs:"26 (practical only)",cie:50,see:50,
units:[
{n:1,title:"Servlets & Session Tracking",hrs:null,topics:"Exp 1A: SimpleServlet handling GET/POST. Exp 1B: SessionServlet — login form, session attributes, logout, session info display."},
{n:2,title:"JSP & Validation",hrs:null,topics:"Exp 2A: JSP employee-data app (create/result pages, JSP expressions/scriptlets). Exp 2B: server-side validation (required fields, regex-style checks, inline error messages)."},
{n:3,title:"JDBC CRUD",hrs:null,topics:"Exp 3: JSP + JDBC CRUD on a `students` table (roll-no, name, email, age)."},
{n:4,title:"Spring Boot MVC",hrs:null,topics:"Exp 4: Spring Boot CRUD on Book entity — Thymeleaf (view), Spring MVC (controller), Spring Data JPA/Hibernate (data), MySQL."},
{n:5,title:"Spring Boot REST APIs",hrs:null,topics:"Exp 5: REST APIs for Mobile entity via Spring Data JPA/Hibernate + MySQL, JSON responses, error handling (404s), tested via curl/Postman. Part B: full-stack mini-project."}],
textbooks:[["Head First Servlets and JSP","Basham, Sierra, Bates","2nd Ed., O'Reilly, 2008"],["Spring Boot in Action","Craig Walls","1st Ed., Manning, 2015"],["Java Persistence with Spring Data and Hibernate","Catalin Tudose","Manning, 2023"]],
refs:[["The Complete Reference J2EE","Jim Keogh","1st Ed., McGraw-Hill, 2017"],["Java: The Complete Reference","Herbert Schildt","11th Ed., McGraw-Hill, 2018"],["Professional Java Development with the Spring Framework","Johnson, Hoeller, et al.","Wrox Press, 2005"],["Spring in Action","Craig Walls","5th Ed., Manning, 2018"]],
moocs:[],
note:"Prerequisite: CS1102-1. Official reference links: edureka.co Servlet/JSP tutorial, spring.io/guides, codejava.net/spring-boot-tutorials, thymeleaf.org/documentation, plus an official YouTube playlist (see Videos). Units 1-3 (Servlets/JSP/JDBC) were thin in the original resource set since most tutorials jump straight to Spring Boot — added GfG walkthroughs that match each experiment's exact pattern (session login/logout, JDBC CRUD) below.",
cheatsheets:[
{title:"Servlet lifecycle (viva favorite)",list:[
"init() — called once, when the container first loads the servlet.",
"service() — called on every request; dispatches to doGet()/doPost() based on the HTTP method.",
"destroy() — called once, when the container unloads the servlet (shutdown or redeploy)."]},
{title:"JSP vs. Servlet — when a viva asks 'why not just use one?'",body:"A Servlet is Java with HTML awkwardly print()'d out — great for logic, painful for markup. A JSP is HTML with Java awkwardly embedded via scriptlets — great for markup, painful for logic. In practice: Servlets handle control flow and business logic, JSPs handle presentation. Under the hood, every JSP is compiled into a Servlet anyway."},
{title:"IoC / Dependency Injection in one sentence",body:"Normally your code calls 'new' to create the objects it depends on; with IoC, the Spring container creates those objects (beans) and hands them to your code instead — 'don't call us, we'll call you.' @Autowired is how you ask the container for a bean instead of constructing it yourself."}
]},

cns:{code:"CS3222-1",name:"Cryptography and Network Security",cat:"PEC (Group-1 elective — confirm this is actually your chosen elective; other Group-1/adjacent options exist, e.g. IoT Device Security, Blockchain Technology, Software Design)",credits:3,ltp:"3-0-0",hrs:"40",cie:50,see:50,
units:[
{n:1,title:"Classical Techniques, Block Ciphers & RSA",hrs:15,topics:"Symmetric cipher model, cryptanalysis, brute-force; substitution techniques (Caesar, monoalphabetic, Playfair, Hill, polyalphabetic, one-time pad); block ciphers, DES, AES intro; RSA principles, algorithm, security",chapters:[["Abstract Algebra & Number Theory","28 lectures"],["Block Cipher (incl. DES, AES)","23"]]},
{n:2,title:"Public-Key Systems, Key Mgmt & Authentication",hrs:15,topics:"Diffie-Hellman, man-in-the-middle, Elgamal, elliptic curve crypto; key distribution & management, X.509 certificates; remote user authentication, Kerberos, identity management",chapters:[["Public Key Cryptography","41 lectures"],["Hash Functions & Digital Signatures","21"]]},
{n:3,title:"Web & IP Security",hrs:10,topics:"Web security threats, SSL, cipher suites, SSH; IPSec overview, security associations, ESP, encryption/auth algorithms, transport/tunnel modes",chapters:[["System Practices & System Security","35 lectures"],["Web, Email, & IP Security","31"]]}],
chSource:"https://www.nesoacademy.org/cs/11-cryptography-and-network-security",chChannel:"Neso Academy",
textbooks:[["Cryptography and Network Security","William Stallings","6th Ed., Pearson, 2013"]],
refs:[["Cryptography and Information Security","V.K. Pachghare","PHE, 2013"]],
moocs:[],
note:"Only Stallings is officially prescribed — Kahate/Forouzan (which both dossiers suggested) aren't in NMAMIT's list, keeping them below only as widely-used supplements. Open item, not resolved this pass: NMAMIT's exact Group-1 PEC roster (which other electives CNS sits alongside — Software Design CS3323-1 and possibly others) isn't in any publicly indexed NMAMIT document; confirm against your own registered elective rather than this site. Separately, standard VTU's 2022-scheme 5th-sem PEC-1 slot (BCS515x) doesn't appear to include Cryptography among its listed options (AI/Unix Systems Programming/Distributed Systems/Computer Graphics show up instead) — VTU may run CNS as a later-semester elective under a different code, so the BCS703 PYQ link below is a best-effort cross-semester proxy, not a confirmed match.",
cheatsheets:[
{title:"Symmetric vs. asymmetric — the one trade-off that matters",body:"Symmetric (AES, DES): same key encrypts and decrypts — fast, but you need a secure channel just to share that key in the first place. Asymmetric (RSA, ECC, Diffie-Hellman): a public/private key pair — solves the key-distribution problem, but 100-1000x slower. Real systems use both together: asymmetric crypto (e.g. RSA/ECDHE in TLS) to safely exchange a one-time symmetric session key, then symmetric crypto (AES) to actually encrypt the bulk traffic."},
{title:"Hash vs. encryption — a favorite viva/exam trap",body:"Encryption is reversible (given the key) — its whole purpose is that someone can decrypt it back. A hash (SHA-256, etc.) is one-way by design — you can verify a hash but never 'decrypt' one. Digital signatures combine both: hash the message, then encrypt just the hash with the sender's private key."},
{title:"Well-known secure ports (comes up in Web/IP Security)",list:["443 — HTTPS (TLS/SSL)","22 — SSH","465 / 587 — SMTPS (secure mail submission)","993 — IMAPS · 995 — POP3S"]}
]},

ipr:{code:"HU1006-1",name:"Introduction to IPR",cat:"HSMC",credits:1,ltp:"1-0-0",hrs:"15",cie:50,see:50,
units:[
{n:1,title:"Intellectual Property Rights",hrs:6,topics:"IPR business perspective; IPR in India — genesis & development; international context; IP management concept; uses in marketing"},
{n:2,title:"Types of Intellectual Property",hrs:6,topics:"Patents (procedure, licensing, infringement); trademarks (incl. domain names); geographical indications; copyright; industrial designs; major court cases on patent violation"},
{n:3,title:"IT Act, 2000",hrs:3,topics:"IT Act introduction; e-commerce & legal provisions; e-governance; digital/electronic signature; cybercrimes"}],
textbooks:[],
refs:[["Managing Innovation: Integrating Technological, Market and Organizational Change","Tidd & Bessant","Wiley, 2021"],["Intellectual Property Rights and the Law","G.B. Reddy","Gogia Law Agency, 2012"],["Law relating to Intellectual Property","B.L. Wadehra","Universal Law Publishing, 2011"],["IPR","P. Narayanan","Eastern Law House, 2017"],["Law of Intellectual Property","S.R. Myneni","Asian Law House, 2022"]],
moocs:[],
note:"Neither dossier mentioned the IT Act 2000 / cybercrime unit — it's a full third of the official syllabus. The specific reference books (Ganguli, N.K. Acharya) both dossiers suggested aren't in NMAMIT's official list either.",
cheatsheets:[
{title:"Term of protection — the number examiners actually ask for",list:[
"Patent: 20 years from the filing date (Patents Act, 1970) — same whether it's a national or PCT international filing.",
"Copyright: lifetime of the author + 60 years (Copyright Act, 1957) — note this is different from the US/EU standard of life+70, a common mix-up.",
"Trademark: 10 years from registration, but renewable indefinitely as long as it stays in commercial use — in principle a trademark never has to expire.",
"Geographical Indication: 10 years, also renewable indefinitely, same logic as trademarks."]},
{title:"The 3-second test: which IP right applies?",body:"Protects a brand name/logo → Trademark. Protects a creative/artistic work (text, code, music, film) → Copyright. Protects a new invention or technical process → Patent. Protects a product's link to a specific place of origin (Darjeeling tea, Mysore silk) → Geographical Indication. Note: pure software algorithms and business methods generally can't be patented in India unless tied to a technical/hardware application — a frequent viva/exam trap."}
]},

uhv:{code:"HU1011-1",name:"Universal Human Values",cat:"HSMC",credits:3,ltp:"3-0-0",hrs:"40",cie:50,see:50,
units:[
{n:1,title:"Value Education — Need, Guidelines, Process",hrs:14,topics:"Self-exploration; natural acceptance & experiential validation; continuous happiness & prosperity; right understanding, relationship, physical facility"},
{n:2,title:"Harmony in the Human Being, Family & Society",hrs:13,topics:"Co-existence of sentient 'I' and material 'Body'; needs of Self vs Body; holistic perspective of physical needs; undivided society, universal order"},
{n:3,title:"Harmony in Existence & Professional Ethics",hrs:13,topics:"Existence as co-existence; holistic perception of harmony at all levels; natural acceptance of human values; professional ethics"}],
textbooks:[],
refs:[["Human Values and Professional Ethics","Gaur, Sangal, Bagaria","Excel Books, 2010"],["Jeevan Vidya: Ek Parichaya","A. Nagaraj","Jeevan Vidya Prakashan, 1999"],["Human Values","A.N. Tripathi","New Age Intl., 2004"],["The Story of Stuff","Annie Leonard","2007"],["The Story of My Experiments with Truth","M.K. Gandhi","1927"],["Small is Beautiful","E.F. Schumacher","1973"]],
moocs:[],
note:"No 'textbook' section in the official syllabus — only references (14 of them, listed here selectively). No MOOC/NPTEL list given for this course specifically."},

pcpp:{code:"CS3651-1",name:"Programming with C++",cat:"AEC — Program Specific Ability Enhancement Course",credits:2,ltp:"1-0-2",hrs:"15+26",cie:50,see:50,
units:[
{n:1,title:"OOP Principles, C++ Basics & Functions",hrs:null,topics:"Procedure- vs object-oriented paradigms; C++ structure, data types, dynamic init, reference variables, scope resolution; function prototyping, inline functions, default args, overloading",chapters:[["Setup, I/O, variables, data types","Apna College"],["Conditionals & loops","Apna College"],["Functions & recursion","Apna College"],["Arrays & strings","Apna College"]]},
{n:2,title:"Classes, Objects, Constructors & Destructors",hrs:null,topics:"Specifying a class, member functions, static members, arrays of objects, friend functions; constructors (default/parameterized/copy/dynamic), multiple constructors, destructors",chapters:[["Classes & Objects","Apna College"],["Constructors & Destructors","Apna College"],["Encapsulation & Abstraction","Apna College"]]},
{n:3,title:"Inheritance, Overloading & Exceptions",hrs:null,topics:"Single/multilevel/multiple/hierarchical/hybrid inheritance, virtual base classes, abstract classes; operator overloading (incl. increment/decrement); exception handling basics; pointers to objects/derived classes, virtual & pure virtual functions",chapters:[["Inheritance (all types)","Apna College"],["Polymorphism & operator overloading","Apna College"]]}],
chSource:"https://www.youtube.com/@ApnaCollegeOfficial",chChannel:"Apna College (topic-mapped, not exact chapter numbers — Neso doesn't run a dedicated C++ OOP course)",
textbooks:[["Object-Oriented Programming with C++","E. Balagurusamy","8th Ed., Tata McGraw Hill, 2018"]],
refs:[["Object-Oriented Programming in Turbo C++","Robert Lafore","4th Ed., 2008"],["C++ The Complete Reference","Herbert Schildt","4th Ed., 2017"]],
moocs:[["NPTEL — Programming in C++ (Prof. Partha Pratim Das, IIT Kharagpur)","https://nptel.ac.in/courses/106105151"],["Udemy — Advanced C++ Programming","https://www.udemy.com/learn-advanced-c-programming"]],
note:"10 official experiments exist (BankAccount class, COMPLEX overloading, Time class, Employee array-of-objects, inheritance constructors, constructor overloading, dynamic constructors/STRNG, hierarchical inheritance, virtual function shape/area, operator overloading for complex numbers) — full list in Units tab. Confirmed 2026-08: NPTEL 106105151 is live, taught by Prof. Partha Pratim Das, IIT Kharagpur.",
cheatsheets:[
{title:"unique_ptr vs. shared_ptr vs. weak_ptr",list:[
"unique_ptr: exactly one owner — can't be copied, only moved. Zero overhead versus a raw pointer. Default choice for almost everything.",
"shared_ptr: reference-counted, multiple owners — the object is destroyed only when the last shared_ptr pointing to it goes away. Small overhead for the atomic reference count.",
"weak_ptr: a non-owning observer of a shared_ptr — used specifically to break reference cycles (e.g. a parent↔child pair that would otherwise leak forever)."]},
{title:"Why virtual functions need a V-Table",body:"A base-class pointer normally only knows the base class's own functions at compile time. Marking a function virtual makes the compiler generate a per-class virtual table (V-Table) of function pointers — the actual call is resolved at runtime by looking up the object's real type in that table. This is exactly how base_ptr->draw() correctly calls Circle::draw() or Square::draw() depending on what base_ptr actually points to."},
{title:"The Diamond Problem, in one picture",body:"class B : public A, class C : public A, class D : public B, C — D now has two separate copies of A's members, and D.someMember is ambiguous. Fix: declare B and C as virtual public A, which forces both to share a single A subobject in D."}
]}
};

// ============ RESOURCES ============
const RESOURCES = [
// ---------- TOC (rebuilt from Theory_of_Computation_Resource_Dossier + fresh verification, Aug 2026) ----------
{course:"toc",unit:1,cat:"notes",title:"Theory of Computation tutorial hub (full syllabus-order index)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/theory-of-computation-automata-tutorials/",access:"Free"},
{course:"toc",unit:1,cat:"notes",title:"Finite Automata lecture slides (CptS 317)",source:"Washington State Univ. (Prof. A. Kalyanaraman)",url:"https://eecs.wsu.edu/~ananth/CptS317/Lectures/FiniteAutomata.pdf",access:"Free"},
{course:"toc",unit:1,cat:"notes",title:"Hopcroft-Ullman author slides (Ch. 1-9)",source:"Concordia University",url:"http://users.encs.concordia.ca/~grahne/hmu_slides/",access:"Free"},
{course:"toc",unit:1,cat:"notes",title:"How to identify if a language is regular",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/how-to-identify-if-a-language-is-regular-or-not/",access:"Free"},
{course:"toc",unit:1,cat:"notes",title:"BCS503 Theory of Computation — notes, model papers, question bank",source:"VTUCircle",url:"https://vtucircle.com/theory-of-computation-bcs503/",access:"Free"},
{course:"toc",unit:1,cat:"video",title:"Theory of Computation & Automata Theory playlist",source:"YouTube · Neso Academy",url:"https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev",access:"Free"},
{course:"toc",unit:1,cat:"video",title:"NPTEL — Theory of Automata, Formal Languages and Computation (Prof. Kamala Krithivasan, IIT Madras — course cited directly in NMAMIT's syllabus)",source:"NPTEL",url:"http://nptel.ac.in/courses/106106049/",access:"Free"},
{course:"toc",unit:1,cat:"video",title:"BCS503 (VTU 2022 Scheme) — complete video playlist, module-tagged",source:"YouTube",url:"https://www.youtube.com/playlist?list=PLxhmqm0jYqJ9Xefiwfovm9Gbj26CPklCG",access:"Free"},
{course:"toc",unit:1,cat:"pyq",title:"Official VTU Model Question Paper — BCS503 (2022 scheme, eff. 2024-25)",source:"vtu.ac.in (official)",url:"https://vtu.ac.in/pdf/QP/BCS503.pdf",access:"Free"},
{course:"toc",unit:1,cat:"pyq",title:"BCS503 previous year question papers",source:"vtuadda",url:"https://vtuadda.com/subject/BCS503/pyqs",access:"Free"},
{course:"toc",unit:2,cat:"notes",title:"Introduction to Pushdown Automata",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/introduction-of-pushdown-automata/",access:"Free"},
{course:"toc",unit:2,cat:"notes",title:"Check if a language is context-free or not",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/check-if-the-language-is-context-free-or-not/",access:"Free"},
{course:"toc",unit:2,cat:"notes",title:"CFG, PDA notes",source:"UIC (Bill D'Alessandro)",url:"https://homepages.math.uic.edu/~rosendal/WebpagesMathCourses/MATH503-notes/CFGs%20and%20Pushdown%20Automata.pdf",access:"Free",note:"Not independently re-verified this pass — flag if the link looks stale."},
{course:"toc",unit:2,cat:"video",title:"MIT OCW 6.045J — Lectures on CFG/PDA",source:"MIT OpenCourseWare",url:"https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-045j-automata-computability-and-complexity-spring-2011/",access:"Free"},
{course:"toc",unit:2,cat:"video",title:"Lec-40: Languages, Automata, Grammars in TOC — comparison",source:"YouTube · Gate Smashers",url:"https://www.youtube.com/watch?v=EoQUZrdlnic",access:"Free"},
{course:"toc",unit:2,cat:"pyq",title:"VTU 21CS51 (Automata Theory & Compiler Design, 2021 scheme) PYQ archive",source:"VTUResource",url:"https://www.vturesource.com/vtu-question-papers/CS/2021/21CS51/Automata-Theory-and-compiler-Design",access:"Free",note:"Older-scheme proxy — content overlap confirmed, but focus only on the Automata sections; the paper also covers Compiler Design, which NMAMIT splits into a separate course (CS3101-1)."},
{course:"toc",unit:3,cat:"notes",title:"Turing Machine notes",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/turing-machine-in-toc/",access:"Free"},
{course:"toc",unit:3,cat:"notes",title:"Introduction to Computational Complexity Theory",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/introduction-to-computation-complex-theory/",access:"Free"},
{course:"toc",unit:3,cat:"notes",title:"CS3102 Theory of Computation — Problem Set 4 (Sipser-based)",source:"Univ. of Virginia (Prof. Gabriel Robins)",url:"https://www.cs.virginia.edu/~robins/cs3102/CS3102_Theory_Problem_Set_4_new_v1.pdf",access:"Free"},
{course:"toc",unit:3,cat:"notes",title:"CS3102 Theory of Computation — Homework 1",source:"Univ. of Virginia (Prof. Gabriel Robins)",url:"https://www.cs.virginia.edu/~robins/cs3102/CS3102_Theory_Homework_1.pdf",access:"Free",note:"Advanced — mapped to Sipser, aimed at students pushing past the semester exam into GATE/deeper undecidability territory."},
{course:"toc",unit:3,cat:"video",title:"Turing Machines, decidability, NP-completeness",source:"YouTube · Neso Academy",url:"https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev",access:"Free"},
{course:"toc",unit:3,cat:"video",title:"Lec-63: Modifications in Turing Machine",source:"YouTube · Gate Smashers",url:"https://www.youtube.com/watch?v=gm3ootzBNDw",access:"Free"},
{course:"toc",unit:3,cat:"pyq",title:"VTU 18CS54 (Automata Theory & Computability, 2018 scheme) PYQ archive",source:"VTUResource",url:"https://www.vturesource.com/vtu-question-papers/CS/2018/18CS54/Automata-theory-and-Computability",access:"Free"},
{course:"toc",unit:0,cat:"coursera",title:"Automata Theory (Ullman's own CS154 course)",source:"edX, not Coursera",url:"https://www.edx.org/course/automata-theory",access:"Free to audit",note:"This is the closest Coursera-style match to the syllabus, but it's actually hosted on edX now, not Coursera — flagging honestly rather than pointing you to a dead Coursera link."},
{course:"toc",unit:0,cat:"gate",title:"GATE CS — Theory of Computation questions",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/theory-of-computation-toc-for-gate/",access:"Free"},
{course:"toc",unit:0,cat:"gate",title:"GATE Overflow — TOC question bank",source:"GATE Overflow",url:"https://gateoverflow.in/theory-of-computation",access:"Free (sign-in for full features)"},
{course:"toc",unit:0,cat:"tool",title:"JFLAP — automata simulator",source:"jflap.org",url:"https://www.jflap.org/",access:"Free"},
{course:"toc",unit:0,cat:"cheatsheet",title:"Last Minute Notes: Theory of Computation",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/theory-of-computation/lmn-toc/",access:"Free"},

// ---------- CNC ----------
{course:"cnc",unit:1,cat:"notes",title:"Computer Networks notes (OSI, data link, network layer)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/",access:"Free"},
{course:"cnc",unit:1,cat:"video",title:"Computer Networks (VTU 22-scheme) Module 1 full PPT walkthrough",source:"SlideShare",url:"https://www.slideshare.net/slideshow/computer-networrs-vtu-22-scheme-first-module-full-ppt/272146679",access:"Free"},
{course:"cnc",unit:1,cat:"video",title:"Neso Academy — Computer Networks playlist",source:"YouTube · Neso Academy",url:"https://www.youtube.com/@nesoacademy",access:"Free"},
{course:"cnc",unit:2,cat:"notes",title:"BCS502/BCS503 CN notes, various modules",source:"Scribd (VTU code aggregation)",url:"https://www.scribd.com/document/431023090/Vtu-5th-Sem-Computer-Networks-Notes",access:"Free preview"},
{course:"cnc",unit:2,cat:"notes",title:"BCS502 Computer Networks — notes, PYQs, lab manuals",source:"vtuadda",url:"https://vtuadda.com/subject/BCS502",access:"Free",note:"Replaces a dead PDF link that was previously here (resolved to a random hosting domain, not an actual NPTEL page)."},
{course:"cnc",unit:3,cat:"notes",title:"Subnetting cheat sheet",source:"TutorialsPoint",url:"https://www.tutorialspoint.com/data_communication_computer_network/index.html",access:"Free"},
{course:"cnc",unit:0,cat:"pyq",title:"BCS502 Model Question Paper (2022-23)",source:"vtu.ac.in (official)",url:"https://vtu.ac.in/pdf/QP/BCS502.pdf",access:"Free"},
{course:"cnc",unit:0,cat:"pyq",title:"BCS502 previous year question papers",source:"vtuadda",url:"https://vtuadda.com/subject/BCS502/pyqs",access:"Free"},
{course:"cnc",unit:0,cat:"pyq",title:"VTU CN lab manual (2022 scheme)",source:"Scribd",url:"https://www.scribd.com/document/783097000/CN-Lab-Manual-22scheme",access:"Free preview"},
{course:"cnc",unit:0,cat:"coursera",title:"The Bits and Bytes of Computer Networking",source:"Coursera · Google",url:"https://www.coursera.org/learn/computer-networking",access:"Free to audit"},
{course:"cnc",unit:0,cat:"coursera",title:"Computer Communications",source:"Coursera · Univ. of Colorado",url:"https://www.coursera.org/learn/computer-communications",access:"Free to audit"},
{course:"cnc",unit:0,cat:"gate",title:"GATE CS — Computer Networks questions (subnetting, TCP windows, congestion control)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/gate/computer-networks-gate-questions/",access:"Free"},
{course:"cnc",unit:0,cat:"tool",title:"NS-2/NS-3 network simulator (official lab tool, Part A)",source:"nsnam.org",url:"https://www.nsnam.org/",access:"Free"},
{course:"cnc",unit:0,cat:"tool",title:"Wireshark (packet capture/analysis)",source:"wireshark.org",url:"https://www.wireshark.org/",access:"Free"},
{course:"cnc",unit:0,cat:"tool",title:"Cisco Packet Tracer (not the official lab tool, but useful for building intuition)",source:"netacad.com",url:"https://www.netacad.com/resources/lab-downloads",access:"Free w/ NetAcad account",note:"Both source dossiers assumed this was the lab tool — the official manual actually uses NS-2/NS-3 + C/C++/Python (see Overview)."},
{course:"cnc",unit:0,cat:"cheatsheet",title:"OSI vs TCP/IP comparison + subnetting basics",source:"Guru99",url:"https://www.guru99.com/data-communication-computer-network-tutorial.html",access:"Free"},

// ---------- OS ----------
{course:"os",unit:1,cat:"notes",title:"Operating System Concepts notes (processes, scheduling)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/operating-systems/",access:"Free"},
{course:"os",unit:1,cat:"video",title:"Neso Academy — Operating System playlist",source:"YouTube · Neso Academy",url:"https://www.youtube.com/@nesoacademy",access:"Free"},
{course:"os",unit:2,cat:"notes",title:"VTU 3rd/5th sem OS notes (2022 scheme)",source:"Scribd",url:"https://www.scribd.com/document/704531273/vtucode-in-2022-scheme-module-1-3rd-semester-CSE",access:"Free preview"},
{course:"os",unit:2,cat:"video",title:"Gate Smashers — Operating Systems playlist",source:"YouTube · Gate Smashers",url:"https://www.youtube.com/@GateSmashers",access:"Free"},
{course:"os",unit:3,cat:"notes",title:"Page replacement & disk scheduling notes",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/page-replacement-algorithms-in-operating-systems/",access:"Free"},
{course:"os",unit:0,cat:"pyq",title:"Official VTU Model Question Paper — BCS303 (2022 scheme)",source:"vtu.ac.in (official)",url:"https://vtu.ac.in/pdf/QP/BCS303.pdf",access:"Free"},
{course:"os",unit:0,cat:"pyq",title:"BCS303 previous year question papers",source:"vtuadda",url:"https://vtuadda.com/subject/BCS303/pyqs",access:"Free",note:"BCS303 is VTU's 3rd-semester OS code — content proxy only, since NMAMIT places OS in 5th semester."},
{course:"os",unit:0,cat:"coursera",title:"Introduction to Operating Systems Specialization (Virtualization, Memory Mgmt, Concurrency, Persistence)",source:"Coursera · Codio",url:"https://www.coursera.org/specializations/codio-introduction-operating-systems",access:"Free to audit",note:"Best topic match found — the 4 courses line up closely with the 3 official units (processes/scheduling, sync/deadlocks/paging, virtual memory/file systems)."},
{course:"os",unit:0,cat:"gate",title:"GATE CS — Operating Systems questions (Gantt charts, semaphores, TLB/paging)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/gate/operating-systems-gate-questions/",access:"Free"},
{course:"os",unit:0,cat:"cheatsheet",title:"Deadlock conditions & scheduling algorithm comparison table",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/introduction-of-deadlock-in-operating-system/",access:"Free"},
{course:"os",unit:0,cat:"pyq",title:"Banker's Algorithm — reference C implementation",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/bankers-algorithm-in-operating-system-2/",access:"Free"},

// ---------- JSF ----------
{course:"jsf",unit:1,cat:"notes",title:"Servlet and JSP tutorial",source:"Edureka (official ref. in syllabus)",url:"https://www.edureka.co/blog/servlet-and-jsp-tutorial/",access:"Free"},
{course:"jsf",unit:1,cat:"notes",title:"Servlet HttpSession login/logout example — matches Exp 1B exactly (login, session attrs, logout)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/java/servlet-httpsession-login-and-logout-example/",access:"Free"},
{course:"jsf",unit:1,cat:"video",title:"Servlet session management with HttpSession — worked example",source:"YouTube · Telusko",url:"https://www.youtube.com/watch?v=CzlZGHAGHbk",access:"Free"},
{course:"jsf",unit:2,cat:"notes",title:"JSP session tracking (cookies, URL rewriting, hidden fields)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/advance-java/jsp-session-tracking/",access:"Free"},
{course:"jsf",unit:3,cat:"notes",title:"Servlet + JDBC CRUD operations — matches Exp 3's students-table pattern directly (raw JDBC, not JPA)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/java/servlet-crud-operation-with-example/",access:"Free"},
{course:"jsf",unit:4,cat:"notes",title:"Spring official guides",source:"spring.io (official ref. in syllabus)",url:"https://spring.io/guides",access:"Free"},
{course:"jsf",unit:4,cat:"notes",title:"Spring Boot tutorials",source:"CodeJava (official ref. in syllabus)",url:"https://www.codejava.net/spring-boot-tutorials",access:"Free"},
{course:"jsf",unit:4,cat:"notes",title:"Thymeleaf documentation",source:"thymeleaf.org (official ref. in syllabus)",url:"https://www.thymeleaf.org/documentation.html",access:"Free"},
{course:"jsf",unit:0,cat:"video",title:"Official course-cited YouTube playlist",source:"YouTube",url:"https://www.youtube.com/playlist?list=PLR2yPNIFMlL9UUF6-syrVrNaRwHVJofZE",access:"Free"},
{course:"jsf",unit:5,cat:"notes",title:"Building a REST API with Spring Boot",source:"Baeldung",url:"https://www.baeldung.com/rest-with-spring-series",access:"Free"},
{course:"jsf",unit:3,cat:"notes",title:"Spring Data JPA tutorials",source:"Baeldung",url:"https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa",access:"Free"},
{course:"jsf",unit:0,cat:"coursera",title:"Building HTTP APIs with Spring",source:"Coursera",url:"https://www.coursera.org/learn/java-spring",access:"Free to audit"},
{course:"jsf",unit:0,cat:"coursera",title:"Master Java Web Services and REST API with Spring Boot",source:"Coursera · Packt",url:"https://www.coursera.org/learn/packt-master-java-web-services-and-rest-api-with-spring-boot-mxnmc",access:"Free to audit",note:"Closest full-syllabus match: Servlets→Spring MVC→JPA→REST, same progression as the official experiment list."},
{course:"jsf",unit:0,cat:"tool",title:"Spring Initializr (official project generator)",source:"start.spring.io",url:"https://start.spring.io/",access:"Free"},
{course:"jsf",unit:0,cat:"tool",title:"Postman (API testing — used in the official experiments)",source:"postman.com",url:"https://www.postman.com/downloads/",access:"Free"},
{course:"jsf",unit:0,cat:"pyq",title:"Java & Spring Boot viva-prep question sets",source:"GitHub — Spring Boot CRUD reference implementations",url:"https://github.com/topics/spring-boot-crud",access:"Free"},

// ---------- CNS ----------
{course:"cns",unit:1,cat:"notes",title:"Cryptography & Network Security notes (all 5 units)",source:"Scribd",url:"https://www.scribd.com/document/812217490/5-21CST7033-Cryptography-and-Network-Security-PEC",access:"Free preview"},
{course:"cns",unit:1,cat:"video",title:"Neso Academy — Cryptography and Network Security",source:"YouTube · Neso Academy",url:"https://www.youtube.com/@nesoacademy",access:"Free"},
{course:"cns",unit:2,cat:"notes",title:"Diffie-Hellman, ECC, Kerberos notes",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/cryptography-and-network-security-principles/",access:"Free"},
{course:"cns",unit:3,cat:"notes",title:"SSL/TLS handshake summary",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/tls-transport-layer-security/",access:"Free"},
{course:"cns",unit:0,cat:"pyq",title:"BCS703/CNS VTU notes & PYQs",source:"vtuadda",url:"https://vtuadda.com/subject/BCS703",access:"Free",note:"BCS7xx is a 7th-semester VTU code — this is a cross-semester proxy, not a confirmed same-semester match. See course note above."},
{course:"cns",unit:0,cat:"coursera",title:"Cryptography I",source:"Coursera · Stanford (Dan Boneh)",url:"https://www.coursera.org/learn/crypto",access:"Free to audit",note:"Excellent match — one of the most popular CS MOOCs ever, covers symmetric encryption, public-key crypto, and key exchange in real depth. 542,000+ learners."},
{course:"cns",unit:0,cat:"gate",title:"GATE Overflow — Cryptography & Network Security questions",source:"GATE Overflow",url:"https://gateoverflow.in/",access:"Free (sign-in for full features)"},
{course:"cns",unit:0,cat:"tool",title:"OpenSSL (encryption/cert command-line tool, if a light practical is required)",source:"openssl.org",url:"https://www.openssl.org/",access:"Free"},

// ---------- IPR ----------
{course:"ipr",unit:1,cat:"notes",title:"IP India — official statutes, rules, procedures",source:"ipindia.gov.in (official govt. portal)",url:"https://ipindia.gov.in/",access:"Free"},
{course:"ipr",unit:2,cat:"notes",title:"Basics of Trademarks (official)",source:"ipindia.gov.in",url:"https://ipindia.gov.in/basics-of-trademarks",access:"Free"},
{course:"ipr",unit:0,cat:"notes",title:"IPR notes (patents, copyright, trademarks)",source:"Scribd",url:"https://www.scribd.com/document/787180493/TOC-Syllabus",access:"Free preview",note:"General IPR notes aggregator — verify content matches unit list before relying on it."},
{course:"ipr",unit:0,cat:"video",title:"NPTEL — Intellectual Property (Prof. Feroz Ali, IIT Madras)",source:"NPTEL",url:"https://nptel.ac.in/courses/109106137",access:"Free"},
{course:"ipr",unit:0,cat:"video",title:"NPTEL — Patent Law for Engineers and Scientists (Prof. Feroz Ali)",source:"NPTEL",url:"https://nptel.ac.in/courses/110106081",access:"Free"},
{course:"ipr",unit:0,cat:"coursera",title:"Introduction to Intellectual Property",source:"Coursera · University of Pennsylvania",url:"https://www.coursera.org/learn/introduction-intellectual-property",access:"Free to audit",note:"Real case studies (Apple, GM, Novartis) — U.S.-focused, so treat as conceptual background rather than a match for India-specific IP India procedure."},
{course:"ipr",unit:3,cat:"notes",title:"IT Act 2000 overview (the unit both dossiers missed)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/information-technology-act-2000-india/",access:"Free"},
{course:"ipr",unit:0,cat:"cheatsheet",title:"Patent vs Copyright vs Trademark comparison",source:"WIPO",url:"https://www.wipo.int/en/web/about-ip",access:"Free"},

// ---------- UHV ----------
{course:"uhv",unit:0,cat:"notes",title:"UHV-II Course Material (official AICTE hub)",source:"uhv.org.in",url:"https://uhv.org.in/UHV-II_Course_Material",access:"Free"},
{course:"uhv",unit:0,cat:"notes",title:"AICTE Universal Human Values Cell",source:"aicte.gov.in",url:"https://www.aicte.gov.in/bureaus/universal-human-values-cell",access:"Free"},
{course:"uhv",unit:0,cat:"video",title:"NPTEL — Universal Human Values (IIT Bombay)",source:"NPTEL",url:"https://onlinecourses.nptel.ac.in/",access:"Free",note:"Search NPTEL/SWAYAM for the current UHV-II offering — course ID rotates by year."},
{course:"uhv",unit:0,cat:"video",title:"AICTE UHV-II Induction Programme course (SWAYAM)",source:"SWAYAM",url:"https://onlinecourses.swayam2.ac.in/aic22_ge23/preview",access:"Free",note:"Confirmed live 2026-08 — this is the AICTE-run SWAYAM offering specifically, separate from the general NPTEL catalog link above."},
{course:"uhv",unit:0,cat:"coursera",title:"— no good match found",source:"n/a",url:"",access:"n/a",note:"UHV-II is a nationally standardized AICTE curriculum with no real Coursera equivalent — the official uhv.org.in material above is the closest thing to an authoritative source. Not forcing a weak match here."},
{course:"uhv",unit:0,cat:"pyq",title:"UHV reflective question papers (VTU)",source:"vtu.ac.in",url:"https://vtu.ac.in/pdf/2022common3to8/BUHK408.pdf",access:"Free"},

// ---------- PC++ ----------
{course:"pcpp",unit:1,cat:"notes",title:"C++ fundamentals & OOP intro",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/cpp/c-plus-plus/",access:"Free"},
{course:"pcpp",unit:2,cat:"notes",title:"Constructors, destructors, static members",source:"cppreference.com",url:"https://en.cppreference.com/w/cpp/language/constructor.html",access:"Free"},
{course:"pcpp",unit:3,cat:"notes",title:"Inheritance, virtual functions, operator overloading",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/cpp/inheritance-in-c/",access:"Free"},
{course:"pcpp",unit:0,cat:"video",title:"Apna College — C++ Full Course",source:"YouTube · Apna College",url:"https://www.youtube.com/@ApnaCollegeOfficial",access:"Free"},
{course:"pcpp",unit:3,cat:"video",title:"C++ STL Complete Tutorial — One Shot (Standard Template Library)",source:"YouTube · Apna College",url:"https://www.youtube.com/watch?v=okhdtEk1iKk",access:"Free",note:"Dedicated STL deep-dive rather than pointing you at the whole 31-hour course again."},
{course:"pcpp",unit:0,cat:"video",title:"BCS306B OOPs with C++ — VTU-scheme playlist",source:"YouTube",url:"https://www.youtube.com/watch?v=9CHk61p_ZF4",access:"Free"},
{course:"pcpp",unit:0,cat:"pyq",title:"VTU OOPs with C++ question papers",source:"VTU Resource",url:"https://www.vturesource.com/vtu-question-papers/CS/2022/BCS306B/Object-Oriented-Programming-with-C++",access:"Free"},
{course:"pcpp",unit:0,cat:"coursera",title:"Object Oriented Programming Specialization",source:"Coursera · University of London",url:"https://www.coursera.org/specializations/object-oriented-programming-s12n",access:"Free to audit",note:"Strong match — builds a C++ project end-to-end through classes, inheritance, and polymorphism, same territory as the 3 official units."},
{course:"pcpp",unit:0,cat:"coursera",title:"Coding for Everyone: C and C++",source:"Coursera · UC Santa Cruz",url:"https://www.coursera.org/specializations/coding-for-everyone",access:"Free to audit"},
{course:"pcpp",unit:0,cat:"gate",title:"GATE-style OOP concept questions (language-agnostic, approximate overlap only)",source:"GATE Overflow",url:"https://gateoverflow.in/",access:"Free (sign-in for full features)",note:"GATE tests OOP concepts, not C++ syntax/STL specifics — useful for concepts, not exam-format practice."},
{course:"pcpp",unit:0,cat:"cheatsheet",title:"OOP pillars + STL containers cheat sheet",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/cpp/the-c-standard-template-library-stl/",access:"Free"}
];

// ============ ADDITIONAL RESOURCES (round 2 — practice platforms, extra sources) ============
const RESOURCES2 = [
{course:"toc",unit:0,cat:"tool",title:"JFLAP tutorial — build/test automata interactively",source:"jflap.org",url:"https://www.jflap.org/tutorial/",access:"Free"},

{course:"cnc",unit:0,cat:"notes",title:"Practice: Subnetting exercises",source:"subnettingpractice.com",url:"https://subnettingpractice.com/",access:"Free"},
{course:"cnc",unit:1,cat:"notes",title:"Data Link Layer notes",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/data-link-layer/",access:"Free"},
{course:"cnc",unit:2,cat:"notes",title:"Routing algorithms (distance vector, link state)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/routing-algorithms-computer-networks/",access:"Free"},
{course:"cnc",unit:2,cat:"video",title:"Gate Smashers — Computer Networks playlist",source:"YouTube · Gate Smashers",url:"https://www.youtube.com/@GateSmashers",access:"Free"},
{course:"cnc",unit:3,cat:"notes",title:"Application layer protocols (HTTP, DNS, FTP, email)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/application-layer-in-osi-model/",access:"Free"},

{course:"os",unit:0,cat:"notes",title:"Practice: Scheduling algorithm problems",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/cpu-scheduling-in-operating-systems/",access:"Free"},
{course:"os",unit:2,cat:"notes",title:"Deadlock prevention/avoidance/detection notes",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/deadlock-prevention-and-avoidance/",access:"Free"},
{course:"os",unit:3,cat:"notes",title:"Disk scheduling algorithms (SCAN, C-SCAN, SSTF)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/operating-systems/disk-scheduling-algorithms/",access:"Free"},
{course:"os",unit:0,cat:"video",title:"Knowledge Gate — Operating System playlist",source:"YouTube · Knowledge Gate",url:"https://www.youtube.com/@knowledgegate",access:"Free"},

{course:"cns",unit:1,cat:"notes",title:"Classical encryption techniques (Caesar, Playfair, Hill cipher)",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/classical-encryption-techniques/",access:"Free"},
{course:"cns",unit:1,cat:"notes",title:"RSA algorithm — worked examples",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/rsa-algorithm-cryptography/",access:"Free"},
{course:"cns",unit:2,cat:"notes",title:"Diffie-Hellman key exchange — worked example",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/computer-networks/implementation-diffie-hellman-algorithm/",access:"Free"},
{course:"cns",unit:0,cat:"video",title:"Gate Smashers — Cryptography & Network Security playlist",source:"YouTube · Gate Smashers",url:"https://www.youtube.com/@GateSmashers",access:"Free"},

{course:"pcpp",unit:0,cat:"notes",title:"Practice: C++ problems",source:"HackerRank",url:"https://www.hackerrank.com/domains/cpp",access:"Free"},
{course:"pcpp",unit:0,cat:"notes",title:"Practice: C++ problems",source:"LeetCode",url:"https://leetcode.com/",access:"Free"},
{course:"pcpp",unit:2,cat:"notes",title:"Constructors & destructors — worked examples",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/cpp/constructors-c/",access:"Free"},
{course:"pcpp",unit:3,cat:"notes",title:"Virtual functions & abstract classes",source:"GeeksforGeeks",url:"https://www.geeksforgeeks.org/cpp/virtual-function-cpp/",access:"Free"},

{course:"jsf",unit:0,cat:"notes",title:"Java official documentation",source:"docs.oracle.com",url:"https://docs.oracle.com/en/java/",access:"Free"},
{course:"jsf",unit:0,cat:"notes",title:"Practice: Java problems",source:"HackerRank",url:"https://www.hackerrank.com/domains/java",access:"Free"},
{course:"jsf",unit:2,cat:"notes",title:"JSP tutorial",source:"JavaTpoint",url:"https://www.javatpoint.com/jsp-tutorial",access:"Free"},

{course:"ipr",unit:2,cat:"notes",title:"Patent basics & filing process",source:"ipindia.gov.in",url:"https://ipindia.gov.in/",access:"Free"},
{course:"ipr",unit:2,cat:"notes",title:"Patent vs. copyright vs. trademark — India-specific comparison with exact term lengths",source:"IndiaFilings",url:"https://www.indiafilings.com/learn/patent-vs-copyright-vs-trademark",access:"Free"},

{course:"uhv",unit:0,cat:"notes",title:"UHV reflective self-study guide",source:"uhv.org.in",url:"https://uhv.org.in/",access:"Free"},

// ---------- added 2026-08: vtuadda coverage check for the 4 subjects that had none ----------
// Verified live via direct fetch before adding. jsf (Java+Spring lab) genuinely has no VTU
// equivalent on vtuadda — there's no standard-scheme Servlet/JSP/Spring Boot lab course to
// index, so it's left without one rather than forcing a weak match.
{course:"pcpp",unit:0,cat:"pyq",title:"BCS306-B Object Oriented Programming with C++ — notes & PYQs",source:"vtuadda",url:"https://vtuadda.com/subject/BCS306-B",access:"Free",note:"Exact-subject match, verified live — same course (OOP with C++), same 2022-scheme code NMAMIT's own textbook table already cites elsewhere on this page."},
{course:"uhv",unit:0,cat:"pyq",title:"BUHK408 Universal Human Values — notes & PYQs",source:"vtuadda",url:"https://vtuadda.com/subject/BUHK408",access:"Free",note:"Exact-subject match, verified live — same VTU code (BUHK408) already used for the official PDF link above."},
{course:"ipr",unit:0,cat:"pyq",title:"BRMK557 Research Methodology and IPR — notes & PYQs",source:"vtuadda",url:"https://vtuadda.com/subject/BRMK557",access:"Free",note:"Not an exact match — VTU's 2022-scheme doesn't run IPR standalone, it's bundled into a 2-credit 'Research Methodology & IPR' course. Useful for the IPR half only; skip the research-methodology modules."}
];
RESOURCES.push(...RESOURCES2);
// assign stable ids
RESOURCES.forEach((r,i)=>{ r.id = r.course+"-"+i; });

const COURSE_ORDER = ["toc","cnc","os","jsf","cns","ipr","uhv","pcpp"];
const CAT_LABEL = {notes:"Notes",video:"Videos",pyq:"PYQs & Question Banks",coursera:"Coursera & Courses",gate:"GATE-CS Cross-Reference",tool:"Tools",cheatsheet:"Cheat Sheets"};
const CAT_ORDER = ["notes","video","coursera","pyq","gate","tool","cheatsheet"];

/* =====================================================================
   BEYOND THE SYLLABUS
   Sourced from a "deep research" PDF the user uploaded, covering general
   BTech-CSE resources (not tied to any one subject above). Spot-checked
   by web search before inclusion — not exhaustively, but the highest-risk
   claims (a very specific community-closure date, current NPTEL course
   codes, instructor pairings, fellowship stipends) were checked against
   live sources. Two stipend figures in the source PDF didn't hold up and
   are corrected below (flag field); everything else checked out or is a
   long-standing, easily-verified resource that didn't need a search.
   ===================================================================== */

const BEYOND = [
  {
    id: "foundational",
    title: "Foundational Learning",
    blurb: "Courses that make you build the thing instead of reading about it — a real OS kernel, a TCP stack, a disk-oriented database.",
    items: [
      { title: "CS:APP — Computer Systems: A Programmer's Perspective", org: "Carnegie Mellon (15-213)", url: "https://csapp.cs.cmu.edu/", what: "The systems course CS people mean when they say \"CSAPP\" — assembly, memory hierarchy, linking, virtual memory.", why: "Ties architecture and OS together from the programmer's side instead of teaching them as separate subjects. Bomb Lab and Attack Lab (reverse engineering, buffer overflows) are the well-known parts.", bestFor: "Year 2", cost: "Free" },
      { title: "Database Systems", org: "Carnegie Mellon (15-445/645)", url: "https://15445.courses.cs.cmu.edu/", what: "How a relational database is actually built — storage, buffer pools, B+ trees, concurrency control — taught by Andy Pavlo (and, as of the Spring 2026 offering, Jignesh Patel).", why: "You implement pieces of a real disk-oriented DB (BusTub) in C++ instead of stopping at SQL and normalization.", bestFor: "Year 3", cost: "Free" },
      { title: "CS144: Introduction to Computer Networking", org: "Stanford", url: "https://cs144.github.io/", what: "Build a working TCP implementation from scratch in modern C++.", why: "Sequence numbers, sliding windows, congestion control stop being diagram theory once you've implemented them.", bestFor: "Year 2 / Year 3", cost: "Free" },
      { title: "Beej's Guide to Network Programming", org: "beej.us", url: "https://beej.us/guide/bgnet/", what: "A long-running, plain-spoken manual on Internet sockets in C — IPv4/IPv6, bind/connect/listen/accept, select()/poll().", why: "The layer beneath every HTTP library you've used. Useful once you're building anything that talks over a raw socket.", bestFor: "Year 2 / Year 3", cost: "Free" },
      { title: "Programming, Data Structures and Algorithms Using Python", org: "NPTEL — Madhavan Mukund, CMI", url: "https://nptel.ac.in/courses/106106145", what: "An 8-week foundations course: searching/sorting, recursion, exception handling, core data structures in Python.", why: "SWAYAM certification counts toward most Indian university credit-transfer/elective policies, which a YouTube playlist doesn't.", bestFor: "Year 1 / Year 2", cost: "Free (certification exam is paid)" },
      { title: "Fundamentals of Object-Oriented Programming", org: "NPTEL — IIT Roorkee", url: "https://onlinecourses.nptel.ac.in/noc26_cs87/preview", what: "OOP design principles across C++, Java, and Python — checked live, this exact course code is running as of 2026.", why: "Focuses on design tradeoffs rather than language syntax you could get from any tutorial.", bestFor: "Year 2", cost: "Free (certification exam is paid)" },
      { title: "CS61A / CS61B / CS61C", org: "UC Berkeley", url: "https://cs61a.org/", what: "Berkeley's lower-division sequence — program structure (Scheme/Python), data structures (Java), then machine structures (C, RISC-V).", why: "Autograded projects are unusually rigorous for self-study, closer to a real problem set than a tutorial exercise.", bestFor: "Year 1 / Year 2", cost: "Free" },
      { title: "HIT OS", org: "Harbin Institute of Technology", url: "https://csdiy.wiki/en/操作系统/HITOS/", what: "An operating systems course built around modifying the actual Linux 0.11 source (real C and x86 assembly, not a simulator).", why: "Editing a real historical kernel makes scheduling, paging, and filesystems concrete in a way abstract OS textbooks don't.", bestFor: "Year 2 / Year 3", cost: "Free" }
    ]
  },
  {
    id: "meta",
    title: "Curated Meta-Resources",
    blurb: "Structural guides that string individual courses into something like a degree, so self-study doesn't turn into an endless list of half-finished tutorials.",
    items: [
      { title: "Teach Yourself Computer Science", org: "teachyourselfcs.com", url: "https://teachyourselfcs.com/", what: "One deliberately short, opinionated list: one book and one lecture series per core subject.", why: "Its whole point is saying no to the encyclopedic approach — depth on SICP and OSTEP over breadth across a hundred links.", bestFor: "All years", cost: "Free" },
      { title: "CS Self-Learning Guide (CS自学指南)", org: "csdiy.wiki, Peking University students", url: "https://csdiy.wiki/en/", what: "A large, systematically organized map of top global CS courses (MIT, Stanford, Berkeley, CMU) by subfield.", why: "Goes deeper into niche subfields — compilers, convex optimization, deep learning systems — than most English-language roadmaps bother to.", bestFor: "All years", cost: "Free" },
      { title: "Open Source Society University (OSSU)", org: "github.com/ossu", url: "https://github.com/ossu/computer-science", what: "A community-maintained flowchart mapping free courses onto a full CS degree's worth of requirements.", why: "More completionist than Teach Yourself CS — good once core subjects are done and you're picking electives (crypto, formal methods, functional programming).", bestFor: "All years", cost: "Free" },
      { title: "Roadmap.sh", org: "roadmap.sh", url: "https://roadmap.sh/", what: "Interactive flowcharts for backend, frontend, DevOps, AI/ML, and a general computer-science track.", why: "Links out to real documentation instead of surface tutorials, so it doubles as a checklist of enterprise concepts (message queues, CI/CD, reverse proxies) worth knowing.", bestFor: "Year 2 / Year 3", cost: "Free" },
      { title: "Awesome CS Courses", org: "GitHub — prakhar1989", url: "https://github.com/prakhar1989/awesome-courses", what: "A maintained directory of university CS courses with public lectures, assignments, and exams.", why: "University course pages move or go behind logins constantly; this list gets kept up to date by the people who actually use it.", bestFor: "All years", cost: "Free" }
    ]
  },
  {
    id: "cp",
    title: "Competitive Programming",
    blurb: "For placement season specifically — structured practice over unstructured grinding.",
    items: [
      { title: "takeUforward — Striver's Sheets", org: "Raj Vikramaditya", url: "https://takeuforward.org/", what: "Structured problem sets — the A2Z DSA Sheet (470+ problems) and a separate CP sheet — with video walkthroughs at brute-force / better / optimal levels.", why: "Curated toward the patterns that actually show up in Indian product-company interviews, rather than solving LeetCode in category order.", bestFor: "Year 2 / Year 3", cost: "Core sheets free; paid tier adds AI features" },
      { title: "USACO Guide", org: "usaco.guide", url: "https://usaco.guide/", what: "A free, well-written guide to competitive-programming algorithms, written by USACO finalists.", why: "Branded for Olympiad prep but genuinely one of the better explanations of DP on trees, segment trees, and graph theory for anyone, at any level.", bestFor: "Year 2 / Year 3", cost: "Free" },
      { title: "Library Checker", org: "judge.yosupo.jp", url: "https://judge.yosupo.jp/", what: "An online judge for stress-testing your own algorithm implementations against extreme edge cases and large inputs.", why: "Useful once you maintain a personal codebase of algorithms and need to know it's actually correct before a contest, not after.", bestFor: "Year 3 / Year 4", cost: "Free" },
      { title: "CSES Problem Set", org: "University of Helsinki", url: "https://cses.fi/problemset/", what: "Exactly 300 problems covering standard algorithms end to end.", why: "Less interview-flavored than LeetCode and less ad-hoc-math-heavy than Codeforces — closer to \"can you actually implement Dijkstra correctly.\"", bestFor: "Year 2", cost: "Free" },
      { title: "CP-Algorithms", org: "cp-algorithms.com (E-Maxx, translated)", url: "https://cp-algorithms.com/", what: "Explanations of advanced algorithms and data structures with working C++ implementations.", why: "For topics like Heavy-Light Decomposition or FFT, this is one of the few places that pairs the proof with code you can actually adapt.", bestFor: "Year 3 / Year 4", cost: "Free" }
    ]
  },
  {
    id: "oss",
    title: "Open-Source Entry Points",
    blurb: "Mentored programs, not \"good first issue\" typo-fixing — these force you to read real codebases and talk to maintainers.",
    items: [
      { title: "Outreachy", org: "outreachy.org", url: "https://www.outreachy.org/", what: "Paid, remote FOSS internships explicitly designed to reduce the usual open-source gatekeeping.", why: "Less saturated than GSoC in India while giving access to the same caliber of orgs (Mozilla, Linux Kernel, GNOME).", bestFor: "Year 2 / Year 3", cost: "Free to apply; interns are paid" },
      { title: "FOSS United", org: "fossunited.org", url: "https://fossunited.org/", what: "A nonprofit growing India's FOSS ecosystem — city meetups, the IndiaFOSS conference, hackathons.", why: "The most useful thing here is local, in-person access to senior engineers at Indian product companies who mentor and hire from this pool.", bestFor: "All years", cost: "Free" },
      { title: "Summer of Bitcoin", org: "summerofbitcoin.org", url: "https://www.summerofbitcoin.org/", what: "A paid summer internship in open-source Bitcoin-ecosystem development.", why: "Narrowly focused on core distributed systems, cryptography, and protocol-level C++/Rust — not the low-quality \"web3\" content the space is usually associated with.", bestFor: "Year 2 / Year 3", cost: "Free to apply; paid internship" },
      { title: "LFX Mentorship", org: "Linux Foundation", url: "https://lfx.linuxfoundation.org/tools/mentorship/", what: "Remote, stipended mentorship pairing students with maintainers of projects like Kubernetes and Node.js.", why: "Runs three cohorts a year (Spring/Summer/Fall) rather than GSoC's single summer window, so there are more entry points.", bestFor: "Year 3 / Year 4", cost: "Free to apply; paid stipend" },
      { title: "MLH Fellowship", org: "fellowship.mlh.io", url: "https://fellowship.mlh.io/", what: "A 12-week remote program built around code review and pair programming on real open-source projects.", why: "Entry is via a code sample, so a solid academic project can get you in without prior open-source history.", bestFor: "Year 2 / Year 3", cost: "Free to apply; stipend varies by track" }
    ]
  },
  {
    id: "communities",
    title: "Communities",
    blurb: "For calibration — what's actually happening in hiring and research right now, from people living it rather than a syllabus.",
    note: "One correction worth flagging: the source PDF's note about a Discord called \"The Coding Den\" closing in July 2026 checked out — its own site and Discord's invite page both confirm it shut down that month after ten years and ~170K members, even though some third-party server-directory sites (which don't get updated promptly) still list it as active.",
    items: [
      { title: "OSSU Discord", org: "discord.gg/ossu", url: "https://discord.gg/ossu", what: "The official Discord for Open Source Society University.", why: "Structured around study groups for specific textbooks/courses (people actually working through CSAPP or 15-445 together), not general chat.", bestFor: "All years", cost: "Free" },
      { title: "r/developersIndia", org: "Reddit", url: "https://www.reddit.com/r/developersIndia/", what: "The largest India-specific developer subreddit — AMAs, salary threads, stack debates.", why: "Useful mainly for the unfiltered service-company-vs-product-company discussion and negotiation specifics during placement season.", bestFor: "Year 3 / Year 4", cost: "Free" },
      { title: "r/Indian_Academia", org: "Reddit", url: "https://www.reddit.com/r/Indian_Academia/", what: "A smaller subreddit focused on the Indian higher-ed system specifically.", why: "Global CS subreddits skew heavily US-market; this one actually discusses GATE strategy and Indian fellowship timelines.", bestFor: "All years", cost: "Free" }
    ]
  },
  {
    id: "fellowships",
    title: "Research Fellowships & Internships",
    blurb: "For MS/PhD-track students specifically — a recommendation letter from faculty carries more weight for grad admissions than most corporate internships.",
    items: [
      { title: "Science Academies' Summer Research Fellowship (SRFP)", org: "IASc / INSA / NASI", url: "https://webjapps.ias.ac.in/fellowship2026/", what: "A 2-month fully-funded research placement with a Fellow of one of India's three national science academies.", why: "Doesn't filter hard on GPA — a strong proposal and one faculty recommendation matter more than transcripts.", bestFor: "Year 2 / Year 3", cost: "Paid", flag: "The source PDF quoted ₹12,500/month. Current sources (as of early 2026) consistently put the actual stipend at ₹8,000–10,000/month plus train fare — worth budgeting for the lower figure." },
      { title: "IIT Bombay Summer Research Internship", org: "IIT Bombay", url: "https://www.iitb.ac.in/en/education/summer-internship", what: "A structured research internship for non-IIT undergrads working directly under IIT Bombay faculty.", why: "A recommendation letter from IIT faculty is disproportionately useful for later MS/PhD applications, and it sidesteps cold-emailing professors directly.", bestFor: "Year 2 / Year 3", cost: "Paid", flag: "The source PDF quoted a fixed ₹6,000–10,000/month. In practice IIT Bombay states there's no fixed stipend policy — it depends on the department and project, and other IITB programs this cycle range anywhere from ₹4,000 to ₹15,000/month (some unpaid). Confirm with your specific supervisor before counting on an amount." },
      { title: "FAST-SF", org: "Inter Academy Panel", url: "https://webjapps.ias.ac.in/fastsf2026/", what: "A SRFP-equivalent fellowship restricted to students from specific under-represented regions (North East states, Bihar, Madhya Pradesh, etc.).", why: "Same benefits as SRFP with a much smaller eligible applicant pool, which meaningfully raises acceptance odds if you qualify by region.", bestFor: "Year 2 / Year 3 (eligible regions only)", cost: "Paid" },
      { title: "Mitacs Globalink Research Internship", org: "Mitacs (Canada)", url: "https://www.mitacs.ca/en/programs/globalink/globalink-research-internship", what: "A competitive 12-week research placement with faculty at Canadian universities; flights, housing, and stipend covered.", why: "Completing it makes you eligible to apply for the Globalink Graduate Fellowship — a funding boost if you later return to Canada for a Master's, though it's an eligibility step, not an automatic guarantee of funding.", bestFor: "Year 3", cost: "Free (fully funded)" },
      { title: "Charpak Lab Scholarship", org: "Campus France / French Government", url: "https://www.inde.campusfrance.org/charpak-lab-scholarship", what: "A French-government-funded research placement in a French lab for Indian students.", why: "European research programs get far less attention than US ones despite comparable funding and infrastructure — a lower-competition entry point toward a European MS.", bestFor: "Year 3 / Year 4", cost: "Free (fully funded)" }
    ]
  },
  {
    id: "research",
    title: "Research Exposure",
    blurb: "Bridging structured textbooks to raw academic literature — mandatory if higher studies are the goal.",
    items: [
      { title: "Papers with Code", org: "paperswithcode.com", url: "https://paperswithcode.com/", what: "Links ML papers directly to their code implementations and tracks state-of-the-art results per task.", why: "Solves the usual problem of a paper being impossible to reproduce — it points straight to the GitHub repo.", bestFor: "Year 3 / Year 4", cost: "Free" },
      { title: "Connected Papers", org: "connectedpapers.com", url: "https://www.connectedpapers.com/", what: "Turns one input paper into a visual graph of related prior and derivative work.", why: "Cuts down literature-review time a lot when entering an unfamiliar subfield — you see the lineage instead of guessing what to read next.", bestFor: "Year 3 / Year 4", cost: "Freemium" },
      { title: "Hugging Face Daily Papers", org: "huggingface.co/papers", url: "https://huggingface.co/papers", what: "A community-curated daily feed of trending AI/ML papers.", why: "A reasonable filter against information overload — you see what researchers are actually discussing this week, not everything on arXiv.", bestFor: "Year 3 / Year 4", cost: "Free" },
      { title: "Semantic Scholar", org: "Allen Institute for AI", url: "https://www.semanticscholar.org/", what: "An academic search engine that surfaces influential citations via NLP rather than raw citation counts.", why: "Google Scholar's ranking skews toward older papers; this makes it faster to judge whether a paper's results are actually relevant to your niche.", bestFor: "All years", cost: "Free" },
      { title: "ar5iv", org: "arxiv.org's HTML rendering project", url: "https://ar5iv.labs.arxiv.org/", what: "Renders arXiv papers as responsive HTML instead of two-column PDF.", why: "Swap the \"x\" in an arxiv.org URL for a \"5\" — genuinely improves reading dense papers on a phone or laptop screen.", bestFor: "All years", cost: "Free" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    blurb: "The unglamorous stuff formal curricula assume you'll pick up on your own.",
    items: [
      { title: "The Missing Semester of Your CS Education", org: "MIT", url: "https://missing.csail.mit.edu/", what: "11 lectures on the command line, shell scripting, Vim, Git, debugging, and (in the newer edition) using AI coding tools well.", why: "Formalizes the Unix workflow habits that otherwise get picked up slowly and inconsistently over years.", bestFor: "Year 1 / Year 2", cost: "Free" },
      { title: "OrbStack", org: "orbstack.dev", url: "https://orbstack.dev/", what: "A lighter, faster Docker Desktop alternative for macOS.", why: "Meaningfully lowers the hardware bar for running containers and local Linux VMs on a mid-range laptop.", bestFor: "Year 2 / Year 3", cost: "Freemium" },
      { title: "Tmux", org: "github.com/tmux/tmux", url: "https://github.com/tmux/tmux", what: "A terminal multiplexer — run and detach from multiple terminal sessions that keep running after you disconnect.", why: "Directly prevents a dropped SSH connection from killing a long-running training job or server process.", bestFor: "Year 2 / Year 3", cost: "Free" },
      { title: "VimAwesome", org: "vimawesome.com", url: "https://vimawesome.com/", what: "A directory of Vim/Neovim plugins.", why: "Skips the trial-and-error of configuring Vim from a blank file into something usable.", bestFor: "Year 2 / Year 3", cost: "Free" },
      { title: "Postman", org: "postman.com", url: "https://www.postman.com/", what: "An API client for testing and documenting REST endpoints.", why: "University projects rarely touch external APIs, so this is often a student's first real exposure to testing auth flows and endpoints properly instead of via print statements.", bestFor: "Year 2 / Year 3", cost: "Freemium" }
    ]
  },
  {
    id: "career",
    title: "Career & Higher-Studies Prep",
    blurb: "System design and GRE prep — the placement season differentiators beyond DSA grinding.",
    items: [
      { title: "ByteByteGo", org: "Alex Xu", url: "https://blog.bytebytego.com/", what: "A visual system-design newsletter from the author of the System Design Interview books.", why: "Turns large-scale architecture patterns (rate limiters, message queues) into diagrams that are actually easy to internalize early, well before you need them in an interview.", bestFor: "Year 3 / Year 4", cost: "Freemium" },
      { title: "GregMat", org: "gregmat.com", url: "https://www.gregmat.com/", what: "A budget-friendly, live-class GRE prep subscription, strongest on verbal reasoning.", why: "Community consensus rates it well above its price point; pair with a quant-focused resource if your math foundation needs more drilling.", bestFor: "Year 3", cost: "Paid, budget-friendly (check current pricing on their site)" },
      { title: "Magoosh GRE", org: "magoosh.com", url: "https://magoosh.com/", what: "An on-demand GRE video library and question bank, strongest on quant and spaced-repetition vocab.", why: "A reasonable complement to GregMat if quant is the weaker half of your prep.", bestFor: "Year 3", cost: "Paid" },
      { title: "Pramp", org: "pramp.com", url: "https://www.pramp.com/", what: "Free peer-to-peer mock technical interviews with a shared code editor.", why: "Practicing saying your algorithmic reasoning out loud, under time pressure, is a different skill than solving the problem silently.", bestFor: "Year 3 / Year 4", cost: "Free" },
      { title: "The System Design Primer", org: "GitHub — donnemartin", url: "https://github.com/donnemartin/system-design-primer", what: "A widely-used open-source repo covering large-scale system design with flashcards and practice questions.", why: "Grounds the concepts in real engineering write-ups from companies like Netflix and Uber rather than abstract theory.", bestFor: "Year 3 / Year 4", cost: "Free" }
    ]
  }
];

const CAT_ICON = {
  notes: FileText,
  video: PlayCircle,
  coursera: GraduationCap,
  pyq: ScrollText,
  gate: Target,
  tool: Wrench,
  cheatsheet: Zap,
};

const BEYOND_ICON = {
  foundational: Cpu,
  meta: Map,
  cp: Swords,
  oss: GitBranch,
  communities: Users,
  fellowships: Award,
  research: FlaskConical,
  tools: TerminalSquare,
  career: Briefcase,
};

// Short, human labels for the course-category badge shown on home cards
// (full text still shown in the course header — this is just for the tight card).
function shortCat(cat) {
  return (cat || "").split(" ").slice(0, 3).join(" ");
}

const STORAGE_KEY = "nmamit-cse-progress";

/* =====================================================================
   HELPERS
   ===================================================================== */

function courseResources(courseId) {
  return RESOURCES.filter((r) => r.course === courseId);
}

function courseProgressStats(courseId, progress) {
  const items = courseResources(courseId);
  const done = items.filter((r) => progress[r.id]).length;
  return { done, total: items.length };
}

function totalProgressStats(progress) {
  const done =
    RESOURCES.filter((r) => progress[r.id]).length +
    BEYOND_FLAT.filter((i) => progress[i.id]).length;
  return { done, total: ALL_TRACKABLE_COUNT };
}

function matchesResourceSearch(r, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    r.title.toLowerCase().includes(s) ||
    r.source.toLowerCase().includes(s) ||
    (r.note || "").toLowerCase().includes(s)
  );
}

function matchesCourseSearch(c, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    c.name.toLowerCase().includes(s) ||
    c.code.toLowerCase().includes(s) ||
    (c.cat || "").toLowerCase().includes(s)
  );
}

// Flatten BEYOND into a stable-id list, and fold it into the same trackable
// pool as the subject resources so the header's progress meter and each
// section's local count both reflect one unified "done" state.
const BEYOND_FLAT = BEYOND.flatMap((section) =>
  section.items.map((item, i) => ({ ...item, sectionId: section.id, id: "beyond-" + section.id + "-" + i }))
);
const ALL_TRACKABLE_COUNT = RESOURCES.length + BEYOND_FLAT.length;

function matchesBeyondSearch(item, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    item.title.toLowerCase().includes(s) ||
    item.org.toLowerCase().includes(s) ||
    item.what.toLowerCase().includes(s) ||
    item.why.toLowerCase().includes(s)
  );
}

function beyondProgressStats(sectionId, progress) {
  const items = BEYOND_FLAT.filter((i) => i.sectionId === sectionId);
  const done = items.filter((i) => progress[i.id]).length;
  return { done, total: items.length };
}

/* =====================================================================
   ATOMS
   ===================================================================== */

// Signature element: a hardware-style segmented meter, styled after an
// LED/terminal progress readout. Built from real DOM blocks (not unicode
// glyphs) so it renders identically everywhere.
function SegBar({ done, total, segments = 10 }) {
  const pct = total > 0 ? done / total : 0;
  const filled = total > 0 ? Math.round(pct * segments) : 0;
  return (
    <span className="segbar" aria-hidden="true">
      <span className="segbar-bracket">[</span>
      <span className="segbar-track">
        {Array.from({ length: segments }).map((_, i) => (
          <span key={i} className={"segbar-seg" + (i < filled ? " on" : "")} />
        ))}
      </span>
      <span className="segbar-bracket">]</span>
    </span>
  );
}

function ProgressChip({ done, total, invert, title }) {
  return (
    <span className={"readout" + (invert ? " readout-invert" : "")} title={title}>
      <SegBar done={done} total={total} segments={10} />
      <span className="readout-frac">{done}/{total}</span>
    </span>
  );
}

function StatBlock({ n, label }) {
  return (
    <div className="stat">
      <span className="stat-n">{n}</span>
      <span className="stat-l">{label}</span>
    </div>
  );
}

function Chip({ label, value }) {
  return (
    <span className="chip">
      {label} <b>{value}</b>
    </span>
  );
}

function SectionHeading({ children, icon: Icon }) {
  return (
    <h2 className="sect-h">
      {Icon ? <Icon size={15} strokeWidth={2.5} className="sect-h-ic" /> : null}
      {children}
    </h2>
  );
}

/* =====================================================================
   SYLLABUS / BOOKS / SHORTLIST / CHEAT SHEETS / GATE
   ===================================================================== */

function UnitTable({ units }) {
  return (
    <table className="utable">
      <tbody>
        {units.map((u) => (
          <tr key={u.n}>
            <td className="unum">{u.hrs !== null ? "U" + u.n : "E" + u.n}</td>
            <td>
              <strong>{u.title}</strong>
              {u.hrs !== null && <span className="uhrs"> {u.hrs}h</span>}
              <div className="utopics">{u.topics}</div>
              {u.tb && <div className="utb">{u.tb}</div>}
              {u.chapters && u.chapters.length > 0 && (
                <div className="uchapters">
                  {u.chapters.map((ch, i) => (
                    <Chip key={i} label={ch[0]} value={ch[1]} />
                  ))}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BookBlock({ list, label }) {
  if (!list || !list.length) return null;
  return (
    <div className="book-block">
      <h4>{label}</h4>
      {list.map((b, i) => (
        <div className="book" key={i}>
          <span className="book-t">{b[0]}</span>
          <span className="book-a">{b[1]}</span>
          {b[2] && <span className="book-e">{b[2]}</span>}
          {b[3] && <span className="book-why">{b[3]}</span>}
        </div>
      ))}
    </div>
  );
}

function Top5Section({ top5 }) {
  if (!top5 || !top5.length) return null;
  return (
    <>
      <SectionHeading>Quintessential Shortlist — If You Only Use 5 Things</SectionHeading>
      <div className="top5">
        {top5.map((t, i) => (
          <div className="top5-item" key={i}>
            <span className="top5-rank">{i + 1}</span>
            <div>
              <div className="top5-t">{t[0]}</div>
              <div className="top5-w">{t[1]}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CheatSheetSection({ cheatsheets }) {
  if (!cheatsheets || !cheatsheets.length) return null;
  return (
    <>
      <SectionHeading icon={Zap}>Rapid Revision — On-Page Cheat Sheets</SectionHeading>
      {cheatsheets.map((cs, i) => (
        <div className="cheat-block" key={i}>
          <h3>{cs.title}</h3>
          {Array.isArray(cs.list) ? (
            cs.ordered ? (
              <ol>{cs.list.map((li, j) => <li key={j}>{li}</li>)}</ol>
            ) : (
              <ul>{cs.list.map((li, j) => <li key={j}>{li}</li>)}</ul>
            )
          ) : (
            <p>{cs.body || ""}</p>
          )}
          {cs.mono && <div className="mono-line">{cs.mono}</div>}
        </div>
      ))}
    </>
  );
}

function GateDeepDiveSection({ items }) {
  if (!items || !items.length) return null;
  return (
    <>
      <SectionHeading icon={Target}>GATE-CS Deep Dive</SectionHeading>
      <div className="gate-grid">
        {items.map((g, i) => (
          <div className="gate-card" key={i}>
            <span className="gate-tag">{g.tag}</span>
            <div className="gate-q">{g.q}</div>
            <div className="gate-d"><b>Why it matters:</b> {g.d}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =====================================================================
   RESOURCE CARDS
   ===================================================================== */

function ResourceCard({ r, checked, onToggle }) {
  const isStub = !r.url;
  return (
    <div className={"rcard" + (isStub ? " rcard-stub" : "")}>
      <label className="rcheck">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={() => onToggle(r.id)}
          aria-label={"Mark done: " + r.title}
        />
        <span />
      </label>
      <div className="rbody">
        <div className="rtitle">{r.title}</div>
        <div className="rmeta">
          {r.source}
          {r.access ? <> <span className="rdot">&middot;</span> <span className="racc">{r.access}</span></> : null}
        </div>
        {r.note && <div className="rnote">{r.note}</div>}
      </div>
      {r.url ? (
        <a className="rlink" href={r.url} target="_blank" rel="noopener noreferrer">
          GO<ExternalLink size={11} strokeWidth={3} />
        </a>
      ) : (
        <span className="rlink rlink-off">N/A</span>
      )}
    </div>
  );
}

function ResourceCategorySection({ cat, items, progress, onToggle }) {
  if (!items.length) return null;
  const Icon = CAT_ICON[cat];
  return (
    <>
      <SectionHeading icon={Icon}>{CAT_LABEL[cat]}</SectionHeading>
      <div className="card-grid">
        {items.map((r) => (
          <ResourceCard key={r.id} r={r} checked={progress[r.id]} onToggle={onToggle} />
        ))}
      </div>
    </>
  );
}

/* =====================================================================
   COURSE CARD (home grid) + COURSE HEADER (detail view)
   ===================================================================== */

function CourseCard({ id, c, progress, onOpen }) {
  const { done, total } = courseProgressStats(id, progress);
  return (
    <button className="ccard" onClick={() => onOpen(id)}>
      <div className="ccard-top">
        <span className="ccard-code">{c.code}</span>
        <span className="ccard-credits">{c.credits} CR</span>
      </div>
      <div className="ccard-name">{c.name}</div>
      <div className="ccard-cat">{shortCat(c.cat)}</div>
      {total > 0 && (
        <div className="ccard-prog">
          <SegBar done={done} total={total} segments={8} />
          <span className="ccard-prog-txt">{done}/{total}</span>
        </div>
      )}
    </button>
  );
}

function CourseHeader({ c }) {
  return (
    <div className="chead">
      <div className="chead-row">
        <span className="ccode-lg">{c.code}</span>
        <span className="cbadge">{c.cat}</span>
      </div>
      <h1>{c.name}</h1>
      <div className="cstats">
        <StatBlock n={c.credits} label="CREDITS" />
        <StatBlock n={c.ltp} label="L-T-P" />
        <StatBlock n={c.hrs} label="HOURS" />
        <StatBlock n={c.cie + "+" + c.see} label="CIE+SEE" />
      </div>
      {c.note && <div className="cnote">{c.note}</div>}
    </div>
  );
}

function ChapterSourceNote({ c }) {
  if (!c.chSource) return null;
  return (
    <div className="chnote">
      Chapter/lecture counts above are pulled straight from{" "}
      <a href={c.chSource} target="_blank" rel="noopener noreferrer">
        <strong>{c.chChannel}</strong>'s own course page <ExternalLink size={11} strokeWidth={3} className="inline-ext" />
      </a>{" "}
      — click through, find the chapter matching what you're stuck on, skip the rest. Numbers = lecture count in that chapter, not minutes.
    </div>
  );
}

function MoocSection({ moocs }) {
  if (!moocs || !moocs.length) return null;
  return (
    <>
      <SectionHeading icon={GraduationCap}>Official MOOC / NPTEL Links (From the Syllabus Itself)</SectionHeading>
      <div className="card-grid">
        {moocs.map((m, i) => (
          <div className="rcard rcard-mooc" key={i}>
            <div className="rbody">
              <div className="rtitle">{m[0]}</div>
            </div>
            <a className="rlink" href={m[1]} target="_blank" rel="noopener noreferrer">
              GO<ExternalLink size={11} strokeWidth={3} />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

/* =====================================================================
   EMPTY STATE
   ===================================================================== */

function EmptyState({ query, onClear, subject }) {
  return (
    <div className="empty-state">
      <span className="empty-mark">∅</span>
      <p className="empty">
        Nothing matches <strong>&ldquo;{query}&rdquo;</strong> {subject ? "in this subject." : "in any subject."}
      </p>
      <button className="empty-clear" onClick={onClear}>Clear search</button>
    </div>
  );
}

/* =====================================================================
   HOME VIEW
   ===================================================================== */

function HomeView({ search, progress, onOpen, onOpenBeyond, onClearSearch, setView }) {
  const visible = useMemo(
    () => COURSE_ORDER.filter((id) => matchesCourseSearch(COURSES[id], search)),
    [search]
  );

  return (
    <div className="home-view">
      <div className="hero">
        <div className="tag-pill">5TH_SEM // CSE // 2024&ndash;28</div>
        <h1>
          PICK YOUR
          <br />
          <span className="hl">SUBJECT.</span>
        </h1>
        <p className="sub">
          All 8 courses. Official NMAMIT syllabus, real textbooks, PYQs, GATE
          cross&#8209;refs, and actual Coursera/YouTube picks — not guesses.
        </p>
      </div>

      {visible.length > 0 ? (
        <div className="grid-courses">
          {visible.map((id, i) => (
            <div
              key={id}
              className="ccard-enter"
              style={{ animationDelay: (i * 35) + "ms" }}
            >
              <CourseCard id={id} c={COURSES[id]} progress={progress} onOpen={onOpen} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState query={search} onClear={onClearSearch} subject={false} />
      )}

      
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
          
          <button onClick={() => setView("notes")} className="beyond-banner" style={{ marginTop: "15px", textDecoration: "none", background: "var(--yellow)", color: "var(--ink)", borderColor: "var(--ink)", width: "100%", textAlign: "left" }}>
            <span className="beyond-banner-ic" style={{ background: "var(--card)" }}>📝</span>
            <span className="beyond-banner-txt">
              <span className="beyond-banner-title">Notes Section</span>
              <span className="beyond-banner-sub" style={{ color: "var(--ink-2)" }}>Access all subject notes folders</span>
            </span>
            <span className="beyond-banner-arrow" style={{ color: "var(--ink)" }}>→</span>
          </button>
        </>
      )}

      {!search && (
        <button className="beyond-banner" onClick={onOpenBeyond} style={{ marginTop: "15px" }}>

          <span className="beyond-banner-ic"><Compass size={22} strokeWidth={2} /></span>
          <span className="beyond-banner-txt">
            <span className="beyond-banner-title">Beyond the Curriculum</span>
            <span className="beyond-banner-sub">Systems courses, competitive programming, research fellowships &amp; more — not on the syllabus, worth knowing about</span>
          </span>
          <span className="beyond-banner-arrow">→</span>
        </button>
      )}
    </div>
  );
}

/* =====================================================================
   COURSE VIEW
   ===================================================================== */

function CourseView({ courseId, search, progress, onToggle, onClearSearch }) {
  const c = COURSES[courseId];
  const all = useMemo(
    () => courseResources(courseId).filter((r) => matchesResourceSearch(r, search)),
    [courseId, search]
  );

  if (!c) return null;

  const hasBooks = c.textbooks.length > 0 || c.refs.length > 0;

  return (
    <div className="course-view">
      <CourseHeader c={c} />
      <Top5Section top5={c.top5} />

      <SectionHeading icon={ScrollText}>Official Syllabus</SectionHeading>
      <UnitTable units={c.units} />
      <ChapterSourceNote c={c} />

      {hasBooks && (
        <>
          <SectionHeading icon={BookOpen}>Textbooks &amp; References</SectionHeading>
          <div className="books">
            <BookBlock list={c.textbooks} label="Prescribed Textbooks" />
            <BookBlock list={c.refs} label="Reference Books" />
          </div>
        </>
      )}

      <MoocSection moocs={c.moocs} />
      <CheatSheetSection cheatsheets={c.cheatsheets} />

      {CAT_ORDER.map((cat) => (
        <ResourceCategorySection
          key={cat}
          cat={cat}
          items={all.filter((r) => r.cat === cat)}
          progress={progress}
          onToggle={onToggle}
        />
      ))}

      <GateDeepDiveSection items={c.gateDeepDive} />

      {all.length === 0 && search && (
        <EmptyState query={search} onClear={onClearSearch} subject={true} />
      )}
    </div>
  );
}

/* =====================================================================
   BEYOND THE SYLLABUS — general BTech-CSE resources, not tied to a subject
   ===================================================================== */

function BeyondItemCard({ item, checked, onToggle }) {
  return (
    <div className="bcard">
      <label className="rcheck bcard-check">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={() => onToggle(item.id)}
          aria-label={"Mark done: " + item.title}
        />
        <span />
      </label>
      <div className="bcard-body">
        <div className="bcard-top">
          <span className="bcard-title">{item.title}</span>
          <a className="rlink bcard-go" href={item.url} target="_blank" rel="noopener noreferrer">
            GO<ExternalLink size={11} strokeWidth={3} />
          </a>
        </div>
        <div className="bcard-org">{item.org}</div>
        <p className="bcard-what">{item.what}</p>
        <p className="bcard-why">{item.why}</p>
        <div className="bcard-tags">
          <span className="tag-year">{item.bestFor}</span>
          <span className="tag-cost">{item.cost}</span>
        </div>
        {item.flag && (
          <div className="bcard-flag">
            <AlertCircle size={13} strokeWidth={2.5} className="bcard-flag-ic" />
            <span>{item.flag}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function BeyondSection({ section, search, progress, onToggle }) {
  const items = useMemo(
    () => section.items
      .map((item, i) => ({ ...item, id: "beyond-" + section.id + "-" + i }))
      .filter((item) => matchesBeyondSearch(item, search)),
    [section, search]
  );
  if (!items.length) return null;
  const Icon = BEYOND_ICON[section.id];
  const stats = beyondProgressStats(section.id, progress);

  return (
    <section id={section.id} className="beyond-section">
      <div className="beyond-section-head">
        <SectionHeading icon={Icon}>{section.title}</SectionHeading>
        <ProgressChip done={stats.done} total={stats.total} />
      </div>
      <p className="beyond-blurb">{section.blurb}</p>
      {section.note && (
        <div className="beyond-note">
          <CheckCircle2 size={14} strokeWidth={2.5} className="beyond-note-ic" />
          <span>{section.note}</span>
        </div>
      )}
      <div className="beyond-grid">
        {items.map((item) => (
          <BeyondItemCard key={item.id} item={item} checked={progress[item.id]} onToggle={onToggle} />
        ))}
      </div>
    </section>
  );
}

function BeyondView({ search, progress, onToggle, onClearSearch }) {
  const visibleSections = useMemo(
    () => BEYOND.filter((section) => section.items.some((item) => matchesBeyondSearch(item, search))),
    [search]
  );

  return (
    <div className="beyond-view">
      <div className="hero">
        <div className="tag-pill">NOT ON THE SYLLABUS — OPTIONAL</div>
        <h1>
          BEYOND THE
          <br />
          <span className="hl">CURRICULUM.</span>
        </h1>
        <p className="sub">
          General BTech-CSE resources for a second-year student — systems courses,
          competitive programming, open source, research fellowships. Pulled from a
          research document you uploaded, spot-checked against live sources before
          anything got added; two stipend figures were corrected below.
        </p>
      </div>

      {visibleSections.length > 0 ? (
        <>
          <nav className="beyond-jumpnav" aria-label="Jump to section">
            {visibleSections.map((section) => {
              const Icon = BEYOND_ICON[section.id];
              return (
                <a key={section.id} href={"#" + section.id} className="beyond-jump-pill">
                  <Icon size={12} strokeWidth={2.5} />
                  {section.title}
                </a>
              );
            })}
          </nav>
          {visibleSections.map((section) => (
            <BeyondSection key={section.id} section={section} search={search} progress={progress} onToggle={onToggle} />
          ))}
        </>
      ) : (
        <EmptyState query={search} onClear={onClearSearch} subject={false} />
      )}
    </div>
  );
}

/* =====================================================================
   STYLES
   A refined neubrutalist system: hard offset shadows, thick ink borders,
   highlighter yellow, and a monospace "terminal" thread (brand mark,
   the SegBar progress meter, data badges) that ties back to the subject
   matter — this is a CS resource hub, so the vernacular is the console.
   ===================================================================== */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

.app-root{
  --ink:#0a0a0a; --ink-2:#454545; --ink-3:#6b6b6b; --ink-4:#909090;
  --paper:#f6f3ec; --card:#ffffff;
  --yellow:#f5c518; --yellow-dark:#dba600; --yellow-pale:#fdedad;
  --blue:#eaf2ff; --blue-line:#8fb8f0;
  --green:#16a34a; --green-pale:#e7f7ee; --red:#d3312d; --red-pale:#fbe9e8;
  --mono:'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
  --sans:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --display:'Archivo Black', Impact, var(--sans);
  --sh-xs:2px 2px 0 var(--ink); --sh-sm:3px 3px 0 var(--ink);
  --sh:4px 4px 0 var(--ink); --sh-lg:7px 7px 0 var(--ink);
  --dur:170ms; --ease:cubic-bezier(.2,.8,.2,1);

  font-family:var(--sans);
  color:var(--ink);
  background:var(--paper);
  min-height:100%;
}

.app-root *, .app-root *::before, .app-root *::after{ box-sizing:border-box; }
.app-root{
  padding-top:76px;
  background-image:radial-gradient(circle at 1px 1px, rgba(10,10,10,.06) 1px, transparent 0);
  background-size:22px 22px;
}
.app-root h1, .app-root h2, .app-root h3{ font-family:var(--display); font-weight:400; letter-spacing:-0.01em; margin:0; }
.app-root button{ font-family:inherit; cursor:pointer; background:none; border:none; padding:0; color:inherit; }
.app-root a{ color:inherit; }
.app-root ::selection{ background:var(--yellow); color:var(--ink); }
.app-root :focus-visible{ outline:3px solid var(--ink); outline-offset:2px; }
.app-root input:focus-visible{ outline:3px solid var(--yellow-dark); outline-offset:0; }

@media (prefers-reduced-motion: reduce){
  .app-root *, .app-root *::before, .app-root *::after{
    animation-duration:.001ms !important; animation-iteration-count:1 !important;
    transition-duration:.001ms !important; scroll-behavior:auto !important;
  }
}

/* ---------- topbar ---------- */
.topbar{ position:fixed; top:0; left:0; right:0; z-index:50; background:var(--card);
  border-bottom:3px solid var(--ink); height:76px; display:flex; align-items:center;
  justify-content:space-between; padding:0 18px; gap:12px; }
.brand{ display:flex; align-items:center; gap:10px; min-width:0; }
.brand-mark{ background:var(--yellow); border:2px solid var(--ink); box-shadow:var(--sh-xs);
  width:38px; height:38px; flex:none; display:flex; align-items:center; justify-content:center; color:var(--ink); }
.brand-txt{ display:flex; flex-direction:column; line-height:1.05; min-width:0; text-align:left; }
.brand-title{ font-family:var(--display); font-size:17px; letter-spacing:-0.01em; text-transform:uppercase; white-space:nowrap; }
.brand-sub{ font-family:var(--mono); font-size:9.5px; font-weight:700; letter-spacing:.08em; color:var(--ink-3); text-transform:uppercase; white-space:nowrap; }
.topbar-right{ display:flex; align-items:center; gap:10px; flex:none; }

.search-wrap{ display:none; position:relative; }
@media(min-width:720px){ .search-wrap{ display:block; } }
.search-ic{ position:absolute; left:9px; top:50%; transform:translateY(-50%); pointer-events:none; color:var(--ink-4); }
.search-input{ font-family:var(--mono); font-size:12.5px; border:2px solid var(--ink); padding:8px 10px 8px 30px;
  width:200px; background:var(--paper); transition:width var(--dur) var(--ease), background var(--dur), box-shadow var(--dur); }
.search-input:focus{ outline:none; background:var(--card); box-shadow:var(--sh-xs); width:246px; }
.search-input::placeholder{ color:var(--ink-4); }

/* ---------- progress readout / SegBar (signature element) ---------- */
.readout{ display:inline-flex; align-items:center; gap:7px; font-family:var(--mono); font-size:11px;
  font-weight:700; background:var(--ink); color:#fff; border:2px solid var(--ink); padding:6px 9px; white-space:nowrap; }
.readout-frac{ opacity:.95; }
.segbar{ display:inline-flex; align-items:center; gap:1px; font-family:var(--mono); }
.segbar-bracket{ opacity:.5; font-weight:700; }
.segbar-track{ display:inline-flex; gap:2px; padding:0 3px; }
.segbar-seg{ width:3px; height:11px; background:rgba(10,10,10,.15); display:inline-block; }
.segbar-seg.on{ background:var(--ink); }
.readout-invert .segbar-seg{ background:rgba(255,255,255,.28); }
.readout-invert .segbar-seg.on{ background:var(--yellow); }

/* ---------- crumb / back ---------- */
.crumb-row{ max-width:1000px; margin:15px auto 0; padding:0 16px; min-height:18px; }
.back{ display:inline-flex; align-items:center; gap:7px; background:var(--ink); color:#fff; border:2px solid var(--ink);
  font-weight:700; font-family:var(--mono); font-size:11.5px; letter-spacing:.03em; padding:9px 14px; text-transform:uppercase;
  transition:transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), background var(--dur), color var(--dur); }
.back:hover{ background:var(--yellow); color:var(--ink); box-shadow:var(--sh-xs); transform:translate(-1px,-1px); }
.back:active{ transform:translate(0,0); box-shadow:none; }

/* ---------- main / mobile search ---------- */
.app-main{ max-width:1000px; margin:0 auto; padding:20px 16px 40px; }
.search-mobile{ display:block; margin-bottom:16px; position:relative; }
@media(min-width:720px){ .search-mobile{ display:none; } }
.search-mobile .search-ic{ left:12px; }
.search-input-mobile{ width:100%; font-family:var(--mono); font-size:14px; border:2px solid var(--ink); padding:11px 12px 11px 34px; background:var(--card); }
.search-input-mobile:focus{ outline:none; box-shadow:var(--sh-xs); }

/* ---------- hero ---------- */
.hero{ padding:30px 0 24px; text-align:center; border-bottom:3px solid var(--ink); margin-bottom:28px; }
.tag-pill{ display:inline-block; background:var(--ink); color:#fff; font-family:var(--mono); font-size:10.5px;
  font-weight:700; padding:5px 11px; transform:rotate(-2deg); margin-bottom:16px; letter-spacing:.08em; }
.hero h1{ font-family:var(--display); font-size:clamp(36px,8vw,64px); line-height:0.98; text-transform:uppercase; }
.hero h1 .hl{ background:var(--yellow); border:3px solid var(--ink); padding:2px 12px 7px; display:inline-block; box-shadow:var(--sh); margin-top:8px; }
.hero .sub{ max-width:540px; margin:20px auto 0; color:var(--ink-2); font-size:15px; font-weight:500; line-height:1.55; }

/* ---------- course grid / card ---------- */
.grid-courses{ display:grid; grid-template-columns:repeat(auto-fill,minmax(215px,1fr)); gap:14px; }
.ccard{ width:100%; text-align:left; background:var(--card); border:3px solid var(--ink); box-shadow:var(--sh);
  padding:17px; transition:transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); display:flex; flex-direction:column; }
.ccard:hover{ transform:translate(-3px,-3px); box-shadow:8px 8px 0 var(--ink); }
.ccard:active{ transform:translate(1px,1px); box-shadow:2px 2px 0 var(--ink); }
.ccard-top{ display:flex; justify-content:space-between; align-items:center; margin-bottom:11px; gap:6px; }
.ccard-code{ font-family:var(--mono); font-size:10.5px; font-weight:700; background:var(--paper); border:1px solid var(--ink); padding:2px 6px; }
.ccard-credits{ font-family:var(--mono); font-size:10.5px; font-weight:800; background:var(--yellow); border:1px solid var(--ink); padding:2px 6px; flex:none; }
.ccard-name{ font-family:var(--display); font-size:17px; line-height:1.18; margin-bottom:9px; text-transform:uppercase; }
.ccard-cat{ font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink-3); text-transform:uppercase; letter-spacing:.03em; margin-top:auto; padding-top:8px; }
.ccard-prog{ display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:11px; padding-top:11px; border-top:2px dashed rgba(10,10,10,.15); }
.ccard-prog-txt{ font-family:var(--mono); font-size:10px; font-weight:700; color:var(--ink-3); }
.ccard-enter{ animation:cardIn 420ms var(--ease) both; }
@keyframes cardIn{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:translateY(0); } }

/* ---------- course header ---------- */
.chead{ border:3px solid var(--ink); background:var(--card); box-shadow:var(--sh-lg); padding:22px; margin-bottom:26px; }
.chead-row{ display:flex; gap:9px; align-items:center; flex-wrap:wrap; margin-bottom:10px; }
.ccode-lg{ font-family:var(--mono); font-size:12.5px; font-weight:700; background:var(--paper); border:1px solid var(--ink); padding:3px 8px; }
.cbadge{ font-family:var(--mono); font-size:10.5px; font-weight:700; background:var(--ink); color:#fff; padding:4px 8px; line-height:1.5; }
.chead h1{ font-family:var(--display); font-size:clamp(24px,5vw,38px); text-transform:uppercase; margin-bottom:16px; line-height:1.05; }
.cstats{ display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:4px; }
.stat{ border:2px solid var(--ink); padding:9px 6px; text-align:center; background:var(--paper); }
.stat-n{ display:block; font-family:var(--mono); font-weight:800; font-size:16px; }
.stat-l{ display:block; font-size:9px; font-weight:700; color:var(--ink-3); letter-spacing:.06em; margin-top:3px; }
.cnote{ margin-top:16px; background:var(--blue); border:2px dashed var(--blue-line); padding:13px 15px; font-size:13px; line-height:1.55; color:var(--ink-2); }

/* ---------- section headings ---------- */
.sect-h{ display:flex; align-items:center; gap:7px; font-family:var(--display); font-size:15.5px;
  text-transform:uppercase; letter-spacing:.01em; margin:0 0 13px; padding:7px 0; border-bottom:3px solid var(--ink); }
.sect-h-ic{ flex:none; color:var(--ink-3); }

/* ---------- unit table ---------- */
.utable{ width:100%; border-collapse:collapse; margin-bottom:28px; border:3px solid var(--ink); box-shadow:var(--sh); background:var(--card); }
.utable td{ border-top:2px solid var(--ink); padding:13px; vertical-align:top; font-size:13.5px; line-height:1.5; }
.utable tr:first-child td{ border-top:none; }
.unum{ font-family:var(--mono); font-weight:800; font-size:13px; background:var(--yellow); width:52px; text-align:center; border-right:2px solid var(--ink); }
.uhrs{ font-family:var(--mono); font-size:11px; color:var(--ink-3); font-weight:700; }
.utopics{ margin-top:5px; color:var(--ink-2); line-height:1.55; }
.utb{ margin-top:7px; font-family:var(--mono); font-size:11px; color:var(--ink-4); }
.uchapters{ margin-top:11px; display:flex; flex-wrap:wrap; gap:6px; }
.chip{ font-size:11px; font-weight:700; background:var(--yellow-pale); border:2px solid var(--ink); padding:4px 8px; white-space:nowrap; }
.chip b{ font-family:var(--mono); font-weight:800; margin-left:4px; }
.chnote{ font-size:12.5px; background:var(--blue); border:2px dashed var(--blue-line); padding:12px 15px; margin:-16px 0 28px; line-height:1.55; color:var(--ink-2); }
.chnote a{ font-weight:800; text-decoration:underline; text-underline-offset:2px; display:inline-flex; align-items:center; gap:3px; }
.inline-ext{ display:inline; vertical-align:-1px; }

/* ---------- books ---------- */
.books{ margin-bottom:28px; }
.book-block{ margin-bottom:15px; }
.book-block h4{ font-family:var(--mono); font-size:11px; text-transform:uppercase; letter-spacing:.05em; margin-bottom:9px; color:var(--ink-3); font-weight:700; }
.book{ display:flex; flex-wrap:wrap; gap:6px 10px; align-items:baseline; border:2px solid var(--ink); background:var(--card); padding:11px 13px; margin-bottom:7px; box-shadow:var(--sh-xs); }
.book-t{ font-weight:800; font-size:13.5px; }
.book-a{ font-size:12.5px; color:var(--ink-3); }
.book-e{ font-family:var(--mono); font-size:11px; color:var(--ink-4); margin-left:auto; }
.book-why{ font-size:11.5px; color:var(--ink-3); line-height:1.5; margin-top:5px; flex-basis:100%; font-style:italic; }

/* ---------- resource cards ---------- */
.card-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(265px,1fr)); gap:11px; margin-bottom:28px; }
.rcard{ display:grid; grid-template-columns:auto 1fr auto; gap:10px; align-items:start; background:var(--card);
  border:2px solid var(--ink); box-shadow:var(--sh-xs); padding:12px; transition:box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease); }
.rcard:hover{ box-shadow:var(--sh-sm); transform:translate(-1px,-1px); }
.rcard-mooc{ grid-template-columns:1fr auto; }
.rcard-stub{ opacity:.7; }
.rcheck{ position:relative; display:inline-flex; margin-top:2px; cursor:pointer; }
.rcheck input{ position:absolute; opacity:0; width:20px; height:20px; margin:0; cursor:pointer; }
.rcheck span{ width:18px; height:18px; border:2px solid var(--ink); display:inline-block; background:#fff; transition:background var(--dur), transform 120ms; }
.rcheck input:checked + span{ background:var(--green); position:relative; transform:scale(1.05); }
.rcheck input:checked + span::after{ content:''; position:absolute; left:5px; top:1px; width:5px; height:9px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg); }
.rcheck input:focus-visible + span{ outline:3px solid var(--yellow-dark); outline-offset:2px; }
.rtitle{ font-weight:700; font-size:13.5px; line-height:1.35; margin-bottom:4px; }
.rmeta{ font-size:11.5px; color:var(--ink-3); }
.rdot{ opacity:.5; }
.racc{ font-family:var(--mono); }
.rnote{ font-size:11px; color:var(--ink-4); font-style:italic; margin-top:6px; line-height:1.45; }
.rlink{ align-self:start; display:inline-flex; align-items:center; gap:4px; font-family:var(--mono); font-weight:800; font-size:10.5px;
  background:var(--ink); color:#fff; border:1px solid var(--ink); padding:7px 9px; text-decoration:none; white-space:nowrap;
  transition:background var(--dur), color var(--dur), transform 120ms; }
.rlink:hover{ background:var(--yellow); color:var(--ink); transform:translate(-1px,-1px); }
.rlink-off{ background:#e6e6e6; color:#9a9a9a; border-color:#d8d8d8; }

/* ---------- empty state ---------- */
.empty-state{ text-align:center; padding:46px 20px; border:3px dashed rgba(10,10,10,.22); }
.empty-mark{ display:block; font-family:var(--mono); font-size:26px; color:var(--ink-4); margin-bottom:10px; }
.empty{ font-family:var(--mono); font-size:13px; color:var(--ink-3); margin:0 0 14px; line-height:1.6; }
.empty-clear{ font-family:var(--mono); font-size:11.5px; font-weight:700; background:var(--ink); color:#fff; border:2px solid var(--ink); padding:8px 14px; text-transform:uppercase; }
.empty-clear:hover{ background:var(--yellow); color:var(--ink); }

/* ---------- top 5 ---------- */
.top5{ border:3px solid var(--ink); background:var(--ink); box-shadow:var(--sh-lg); padding:19px; margin-bottom:28px; }
.top5-item{ background:var(--card); border:2px solid var(--ink); padding:11px 13px; margin-bottom:9px; display:flex; gap:11px; }
.top5-item:last-child{ margin-bottom:0; }
.top5-rank{ font-family:var(--mono); font-weight:800; font-size:15px; background:var(--yellow); border:2px solid var(--ink);
  width:27px; height:27px; flex:none; display:flex; align-items:center; justify-content:center; }
.top5-t{ font-weight:700; font-size:13.5px; margin-bottom:3px; }
.top5-w{ font-size:12px; color:var(--ink-3); line-height:1.5; }

/* ---------- cheat sheets ---------- */
.cheat-block{ border:3px solid var(--ink); background:var(--card); box-shadow:var(--sh); padding:17px; margin-bottom:15px; }
.cheat-block h3{ font-family:var(--display); font-size:14px; text-transform:uppercase; margin-bottom:9px; letter-spacing:.01em; }
.cheat-block ol, .cheat-block ul{ margin:7px 0 0; padding-left:21px; font-size:12.5px; line-height:1.65; color:var(--ink-2); }
.cheat-block li{ margin-bottom:4px; }
.cheat-block p{ font-size:12.5px; line-height:1.65; color:var(--ink-2); margin:0; }
.cheat-block .mono-line{ font-family:var(--mono); font-size:12px; background:var(--paper); border:1px solid var(--ink); padding:7px 9px; margin-top:8px; display:inline-block; }

/* ---------- GATE deep dive ---------- */
.gate-grid{ display:grid; grid-template-columns:1fr; gap:11px; margin-bottom:28px; }
.gate-card{ border:2px solid var(--ink); background:var(--blue); border-left:6px solid var(--ink); padding:15px; }
.gate-tag{ font-family:var(--mono); font-weight:800; font-size:10px; background:var(--ink); color:#fff; padding:3px 8px; display:inline-block; margin-bottom:9px; text-transform:uppercase; }
.gate-q{ font-size:13px; line-height:1.6; margin-bottom:9px; color:var(--ink); }
.gate-d{ font-size:12.5px; line-height:1.6; color:var(--ink-2); border-top:2px dashed var(--blue-line); padding-top:9px; }
.gate-d b{ color:var(--ink); }

/* ---------- view transition / footer ---------- */
.view-fade{ animation:viewIn 260ms var(--ease) both; }
@keyframes viewIn{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:translateY(0); } }
.site-footer{ max-width:1000px; margin:14px auto 0; padding:22px 16px 34px; border-top:3px solid var(--ink);
  display:flex; flex-wrap:wrap; gap:10px 16px; align-items:center; justify-content:space-between; font-family:var(--mono); font-size:11px; color:var(--ink-4); }
.reset-btn{ font-family:var(--mono); font-size:11px; font-weight:700; background:none; border:2px solid var(--ink); color:var(--ink);
  padding:7px 11px; display:inline-flex; align-items:center; gap:6px; text-transform:uppercase; transition:background var(--dur), color var(--dur); }
.reset-btn:hover{ background:var(--ink); color:#fff; }
.reset-btn.armed{ background:var(--red); border-color:var(--red); color:#fff; }

/* ---------- beyond-the-curriculum banner (home entry point) ---------- */
.beyond-banner{ width:100%; display:flex; align-items:center; gap:14px; text-align:left;
  background:var(--ink); color:#fff; border:3px solid var(--ink); box-shadow:var(--sh-lg);
  padding:18px; margin-top:30px; transition:transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
.beyond-banner:hover{ transform:translate(-3px,-3px); box-shadow:10px 10px 0 rgba(10,10,10,.35); }
.beyond-banner:active{ transform:translate(1px,1px); box-shadow:2px 2px 0 rgba(10,10,10,.35); }
.beyond-banner-ic{ flex:none; width:44px; height:44px; background:var(--yellow); color:var(--ink);
  border:2px solid var(--ink); display:flex; align-items:center; justify-content:center; }
.beyond-banner-txt{ flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
.beyond-banner-title{ font-family:var(--display); font-size:16px; text-transform:uppercase; letter-spacing:.01em; }
.beyond-banner-sub{ font-size:12px; line-height:1.5; color:rgba(255,255,255,.75); }
.beyond-banner-arrow{ flex:none; font-family:var(--mono); font-size:20px; font-weight:800; color:var(--yellow); }

/* ---------- beyond view ---------- */
.beyond-jumpnav{ display:flex; gap:8px; overflow-x:auto; padding-bottom:6px; margin-bottom:26px; scrollbar-width:none; }
.beyond-jumpnav::-webkit-scrollbar{ display:none; }
.beyond-jump-pill{ flex:none; display:inline-flex; align-items:center; gap:6px; font-family:var(--mono);
  font-size:11px; font-weight:700; background:var(--card); border:2px solid var(--ink); color:var(--ink);
  padding:8px 12px; text-decoration:none; white-space:nowrap; transition:background var(--dur), color var(--dur), transform 120ms; }
.beyond-jump-pill:hover{ background:var(--yellow); transform:translateY(-1px); }
.beyond-section{ scroll-margin-top:92px; margin-bottom:8px; }
.beyond-section-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
.beyond-section-head .sect-h{ flex:1; }
.beyond-blurb{ font-size:13px; color:var(--ink-3); line-height:1.55; margin:-4px 0 16px; max-width:640px; }
.beyond-note{ display:flex; gap:8px; align-items:flex-start; background:var(--green-pale); border:2px dashed #8fcaa8;
  padding:11px 14px; margin-bottom:16px; font-size:12px; line-height:1.55; color:var(--ink-2); }
.beyond-note-ic{ flex:none; margin-top:2px; color:var(--green); }
.beyond-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:12px; margin-bottom:34px; }

/* ---------- beyond item card ---------- */
.bcard{ display:grid; grid-template-columns:auto 1fr; gap:11px; align-items:start; background:var(--card);
  border:2px solid var(--ink); box-shadow:var(--sh-xs); padding:14px; transition:box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease); }
.bcard:hover{ box-shadow:var(--sh-sm); transform:translate(-1px,-1px); }
.bcard-check{ margin-top:3px; }
.bcard-body{ min-width:0; }
.bcard-top{ display:flex; align-items:flex-start; justify-content:space-between; gap:10px; margin-bottom:3px; }
.bcard-title{ font-weight:800; font-size:14px; line-height:1.3; }
.bcard-go{ flex:none; margin-top:1px; }
.bcard-org{ font-family:var(--mono); font-size:10.5px; color:var(--ink-3); margin-bottom:8px; }
.bcard-what{ font-size:12.5px; color:var(--ink-2); line-height:1.5; margin:0 0 6px; }
.bcard-why{ font-size:12px; color:var(--ink-3); line-height:1.55; margin:0 0 10px; }
.bcard-tags{ display:flex; flex-wrap:wrap; gap:6px; }
.tag-year, .tag-cost{ font-family:var(--mono); font-size:10px; font-weight:700; padding:3px 8px; border:1px solid var(--ink); }
.tag-year{ background:var(--yellow-pale); }
.tag-cost{ background:var(--paper); color:var(--ink-3); }
.bcard-flag{ display:flex; gap:7px; align-items:flex-start; background:var(--red-pale); border:2px dashed #e3a09d;
  padding:9px 11px; margin-top:10px; font-size:11.5px; line-height:1.5; color:var(--ink-2); }
.bcard-flag-ic{ flex:none; margin-top:2px; color:var(--red); }

/* ---------- responsive ---------- */
@media(max-width:600px){
  .cstats{ grid-template-columns:repeat(2,1fr); }
  .card-grid{ grid-template-columns:1fr; }
  .beyond-grid{ grid-template-columns:1fr; }
  .grid-courses{ grid-template-columns:1fr 1fr; }
  .chead{ padding:17px; }
  .app-main{ padding:16px 12px 40px; }
  .beyond-banner{ flex-wrap:wrap; }
  .beyond-banner-arrow{ display:none; }
}
@media(max-width:420px){
  .grid-courses{ grid-template-columns:1fr; }
  .topbar{ padding:0 12px; }
  .brand-sub{ display:none; }
}
`;

/* =====================================================================
   APP
   ===================================================================== */

export default function App() {
  const [view, setView] = useState("home");
  const [courseId, setCourseId] = useState(null);
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);

  const searchDesktopRef = useRef(null);
  const searchMobileRef = useRef(null);
  const resetTimer = useRef(null);

  // Load saved progress once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (!cancelled) setProgress(res && res.value ? JSON.parse(res.value) : {});
      } catch (e) {
        if (!cancelled) setProgress({});
      } finally {
        if (!cancelled) setProgressLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Persist progress after every change (but never before the initial load
  // completes, or we'd stomp saved data with an empty object).
  useEffect(() => {
    if (!progressLoaded) return;
    (async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(progress), false);
      } catch (e) {
        console.error("Progress save failed:", e);
      }
    })();
  }, [progress, progressLoaded]);

  // "/" focuses search, Escape blurs it — small power-user touch.
  useEffect(() => {
    function onKey(e) {
      const tag = e.target && e.target.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        const wide = window.matchMedia("(min-width: 720px)").matches;
        const el = wide ? searchDesktopRef.current : searchMobileRef.current;
        if (el) el.focus();
      } else if (e.key === "Escape" && (tag === "INPUT")) {
        e.target.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);

  const openCourse = useCallback((id) => {
    setView("course");
    setCourseId(id);
    setSearch("");
    window.scrollTo(0, 0);
  }, []);

  
  const openAdmin = useCallback(() => {
    setView("admin");
    setCourseId(null);
    setSearch("");
    window.scrollTo(0, 0);
  }, []);
const openBeyond = useCallback(() => {
    setView("beyond");
    setCourseId(null);
    setSearch("");
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    setView("home");
    setCourseId(null);
    setSearch("");
    window.scrollTo(0, 0);
  }, []);

  const clearSearch = useCallback(() => setSearch(""), []);

  const handleToggle = useCallback((id) => {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleReset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      resetTimer.current = setTimeout(() => setResetArmed(false), 4000);
    } else {
      clearTimeout(resetTimer.current);
      setResetArmed(false);
      setProgress({});
    }
  };

  const { done, total } = totalProgressStats(progress);

  return (
    <div className="app-root">
      <style>{STYLES}</style>

      <div className="topbar">
        <button className="brand" onClick={goHome} aria-label="Go to subject list">
          <span className="brand-mark"><TerminalSquare size={19} strokeWidth={2.5} /></span>
          <span className="brand-txt">
            <span className="brand-title">NMAMIT</span>
            <span className="brand-sub">CSE 5th Sem Hub</span>
          </span>
        </button>
        <div className="topbar-right">
          <div className="search-wrap">
            <Search size={14} className="search-ic" />
            <input
              ref={searchDesktopRef}
              className="search-input"
              type="text"
              placeholder="SEARCH… (press /)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search resources"
            />
          </div>
          
          <button onClick={openAdmin} style={{ padding: "6px 10px", background: "var(--ink)", color: "#fff", fontWeight: "bold", border: "2px solid var(--ink)", fontSize: "11px", display: "flex", alignItems: "center", gap: "5px" }}>
            ADMIN
          </button>
          <ProgressChip done={done} total={total} invert title={done + " of " + total + " resources checked off"} />
        </div>
      </div>

      <div className="crumb-row">
        {view !== "home" && (
          <button className="back" onClick={goHome}>
            <ArrowLeft size={13} strokeWidth={3} /> ALL SUBJECTS
          </button>
        )}
      </div>

      <main className="app-main">
        <div className="search-mobile">
          <Search size={15} className="search-ic" />
          <input
            ref={searchMobileRef}
            className="search-input-mobile"
            type="text"
            placeholder={view === "course" ? "Search this subject…" : view === "beyond" ? "Search these resources…" : "Search subjects…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />
        </div>

        <div key={view + "-" + (courseId || "home")} className="view-fade">
          {view === "home" && (
            <HomeView search={search} progress={progress} onOpen={openCourse} onOpenBeyond={openBeyond} onClearSearch={clearSearch} setView={setView} />
          )}
          {view === "course" && (
            <CourseView
              courseId={courseId}
              search={search}
              progress={progress}
              onToggle={handleToggle}
              onClearSearch={clearSearch}
            />
          )}
          
          
          {(view === "qp" || view === "qp-college" || view === "qp-other") && (
            <QpView view={view} setView={setView} />
          )}
          {(view === "notes" || view === "notes-our" || view === "notes-other") && (
            <NotesView view={view} setView={setView} />
          )}
          {view === "admin" && (
            <AdminView />
          )}
          {view === "beyond" && (
            <BeyondView search={search} progress={progress} onToggle={handleToggle} onClearSearch={clearSearch} />
          )}
        </div>
      </main>

      <footer className="site-footer">
        
        <button className={"reset-btn" + (resetArmed ? " armed" : "")} onClick={handleReset}>
          <RotateCcw size={12} strokeWidth={2.5} />
          {resetArmed ? "Tap again to confirm" : "Reset progress"}
        </button>
      </footer>
    </div>
  );
}
