const express = require('express');

const spacesMiddleware = require('./spaces/middleware');

const app = express();
const PORT = 3000;
const HOSTNAME = 'localhost';

app.use(spacesMiddleware);

app.get('/upper-chamber', function(req, res) {
    res.json('In upper chamber');
});


app.get('/lower-chamber', function(req, res) {
    res.json('In lower chamber');
});

console.log(`Running server at "http://${HOSTNAME}:${PORT}"`)
app.listen(PORT, HOSTNAME);