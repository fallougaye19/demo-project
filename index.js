const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    res.send(req.query.name); // vulnérable XSS
});

app.listen(3000);