const express = require("express");
const app = express();

const AWS_ACCESS_KEY_ID = "AKIA1234567890ABCDE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

const db = {
    query: (sql) => console.log("Executing:", sql),
};

app.get("/user", (req, res) => {
    const userId = req.query.id;
    const sql = "SELECT * FROM users WHERE id = " + userId;
    db.query(sql);
    res.send(`Fetching user ${userId}`);
});

app.get("/greet", (req, res) => {
    const name = req.query.name;
    res.send(`<h1>Hello, ${name}</h1>`);
});

const fs = require("fs");
app.get("/file", (req, res) => {
    const filename = req.query.file;
    const content = fs.readFileSync("/var/app/files/" + filename);
    res.send(content);
});
app.get("/redirect", (req, res) => {
    const target = req.query.url;
    res.redirect(target); 
});

app.listen(3000, () => console.log("Vulnerable demo app running on port 3000"));
