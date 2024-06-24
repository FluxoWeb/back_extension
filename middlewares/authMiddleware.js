const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_MYSECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        }
        catch (error) {
            throw new Error('No autorizado (token expirado), Por favor vuelva a iniciar sesion');
        }
    }
    else {
        throw new Error('No hay token adjunto al header');
    }
});


const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.rol !== "Admin") {
        throw new Error('Tu no eres admin');
    }
    else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };
