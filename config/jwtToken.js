const jwt = require('jsonwebtoken');

const generateToken = (id, rol, ci) => {
    return jwt.sign(
        { 
            id, 
            rol,
            ci,
        }, process.env.JWT_MYSECRET, {expiresIn: "1d"});
}

module.exports = { generateToken };