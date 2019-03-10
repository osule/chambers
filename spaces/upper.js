const cred = Buffer.from('to:heaven').toString('base64');

module.exports = function(userCred) {
    return userCred === cred;
};
