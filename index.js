const express = require("express");
const app = express();

// ============================================================
// 🚨 VULNERABILITY 1: HARDCODED CREDENTIALS (CWE-798)
// GitHub Advanced Security / Secret Scanning will flag this
// AWS Access Key exposed directly in source code
// ============================================================
const AWS_ACCESS_KEY_ID = "AKIA1234567890ABCDE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

const db = {
    query: (sql) => console.log("Executing:", sql),
};

// ============================================================
// 🚨 VULNERABILITY 2: SQL INJECTION (CWE-89)
// CodeQL will detect unsanitized input used in SQL query
// Attacker input: ?id=1 OR 1=1--
// ============================================================
app.get("/user", (req, res) => {
    const userId = req.query.id;
    const sql = "SELECT * FROM users WHERE id = " + userId; // ← CodeQL flags this
    db.query(sql);
    res.send(`Fetching user ${userId}`);
});

// ============================================================
// 🚨 VULNERABILITY 3: REFLECTED XSS (CWE-79)
// CodeQL will detect unsanitized user input reflected in HTML
// Attacker input: ?name=<script>alert('XSS')</script>
// ============================================================
app.get("/greet", (req, res) => {
    const name = req.query.name;
  res.send(`<h1>Hello, ${name}</h1>`); // ← Unsanitized input in HTML response
});

// ============================================================
// 🚨 VULNERABILITY 4: PATH TRAVERSAL (CWE-22)
// CodeQL detects user-controlled path used in file system access
// Attacker input: ?file=../../etc/passwd
// ============================================================
const fs = require("fs");
app.get("/file", (req, res) => {
    const filename = req.query.file;
  const content = fs.readFileSync("/var/app/files/" + filename); // ← Dangerous
    res.send(content);
});

// ============================================================
// 🚨 VULNERABILITY 5: OPEN REDIRECT (CWE-601)
// Unvalidated redirect destination controlled by user
// Attacker input: ?url=https://evil.com
// ============================================================
app.get("/redirect", (req, res) => {
    const target = req.query.url;
  res.redirect(target); // ← No validation of redirect destination
});

app.listen(3000, () => console.log("Vulnerable demo app running on port 3000"));
