const upper = require('./upper');
const lower = require('./lower');

const spaces = {
    '/upper': upper,
    '/lower': lower
};

module.exports = function (space) {
    const accessor = () => false;

    return {
        hasSpaceAccess: spaces.hasOwnProperty(space) ? spaces[space]: accessor
    };
};