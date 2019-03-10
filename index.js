const express = require('express');
const path = require('path');

const space = require('./spaces');
const app = express();

const PORT = 3000;
const HOSTNAME = 'localhost';
const FORBIDDEN = path.join(process.cwd(), 'FORBIDDEN.html');

app.use(function(req, res, next) {
    const realm = req.path.replace(/([\w]+)-([\w]+)/, '$1');

    const authorization = req.headers.authorization;
    const rechallenge = req.query.hasOwnProperty('rechallenge');

    const authCred = authorization && authorization.replace(/Basic (\w+)/, '$1');

    const spaceRealm = space(realm);
    if (!spaceRealm.hasSpaceAccess(authCred) && !rechallenge) {
        res.status(403).sendFile(FORBIDDEN);
    }
    else if (!spaceRealm.hasSpaceAccess(authCred) && rechallenge || !authCred) {
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