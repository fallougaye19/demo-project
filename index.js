const express = require('express');
const app = express();

const AWS_ACCESS_KEY_ID = "AKIA1234567890ABCDE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

app.get('/user', (req, res) => {
    res.send(req.query.name);
});

app.listen(3000);