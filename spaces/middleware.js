const space = require('./index');
const path = require('path');

const FORBIDDEN = path.join(process.cwd(), 'spaces', 'FORBIDDEN.html');

module.exports = function(req, res, next) {
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
}