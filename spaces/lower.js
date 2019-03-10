const cred = Buffer.from('fro:hell').toString('base64');

module.exports = function(userCred) {
    return userCred === cred;
};
