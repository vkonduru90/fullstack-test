const jwt = require("jsonwebtoken");
const { secretKey } = require("../config").jwt;

const TOKEN_EXPIRATION = 60 * 60 * 24 * 365 * 10;

module.exports.jwtToken = {
    sign: (payload) => {
        return jwt.sign(payload, secretKey, {
            expiresIn: TOKEN_EXPIRATION
        });
    },
    verify: (token) => {
        return jwt.verify(token, secretKey);
    },
};