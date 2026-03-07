const express = require('express');
const app = express();
const AWS_SECRET = "AKIAIOSFODNN7EXAMPLE";

app.get('/user', (req, res) => {
    res.send(req.query.name); // vulnérable XSS
});

app.listen(3000);