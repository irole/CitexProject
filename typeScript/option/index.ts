const fileExt = require('./fileExt');
const layout = require('./layout');
const session = require('./session');
const httpStatus = require('./httpStatus');

module.exports = {
    fileExt,
    layout,
    session,
    httpStatus,
    jwt: {
        secret_key: process.env.JWT_SECRETKEY,
    },
};
