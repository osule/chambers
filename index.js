const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;
const HOSTNAME = 'localhost';
const FORBIDDEN = path.join(process.cwd(), 'FORBIDDEN.html');

const spacesCreds = {
    '/upper': Buffer.from('to:heaven').toString('base64'),
    '/lower': Buffer.from('fro:hell').toString('base64'),
};

app.use(function(req, res, next) {
    const realm = req.path.replace(/([\w]+)-([\w]+)/, '$1');

    const authorization = req.headers.authorization;
    const rechallenge = req.query.hasOwnProperty('rechallenge');

    const canAccessSpace = spacesCreds.hasOwnProperty(realm);
    const authCred = authorization && authorization.replace(/Basic (\w+)/, '$1');


    if (canAccessSpace && spacesCreds[realm]  !== authCred && !rechallenge) {
        res.status(403).sendFile(FORBIDDEN);
    }
    else if (rechallenge || !authCred) {
        res.setHeader('WWW-authenticate', `Basic realm="upper-chamber",Basic realm="lower-chamber"`);
        res.sendStatus(401);
    }
    else {
        next();
    }
});

app.get('/upper-chamber', function(req, res) {
    res.json('In upper chamber');
});


app.get('/lower-chamber', function(req, res) {
    res.json('In lower chamber');
});

console.log(`Running server at "http://${HOSTNAME}:${PORT}"`)
app.listen(PORT, HOSTNAME);