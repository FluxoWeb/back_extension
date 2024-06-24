const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');
const { generateToken } = require('../config/jwtToken');

// Funcion de crear usuario
const createUser = asyncHandler(async (req, res) => {
    const { email, ci } = req.body.email;
    const findUser = await User.findOne({ email: email, ci: ci });

    // Crear usuario
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error("Ya existe este usuario");
    }
});

// Funcion para el login del usuario
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check si existe usuario o no
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json({
            _id: findUser?._id,
            rol: findUser?.rol,
            ci: findUser?.ci,
            token: generateToken(
                findUser?._id,
                findUser?.rol,
                findUser?.ci,
            ),
        });
    }
    else {
        throw new Error("Credenciales Invalidas");
    };
});

// Funcion para editar usuario
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const UpdateUser = await User.findByIdAndUpdate(
            id,
            {
                nombre: req?.body?.nombre,
                apellido: req?.body?.apellido,
                ci: req?.body?.ci,
                email: req?.body?.email,
                rol: req?.body?.rol,
                carrera: req?.body?.carrera,
                curso: req?.body?.curso,
            },
            {
                new: true,
            }
        );
        res.json(UpdateUser);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener todos los usuarios
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find().populate('carrera', 'carrera abrev');
        res.json(getUsers);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener un usuario
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaUser = await User.findById(id).populate('carrera', 'carrera abrev');
        res.json(getaUser);
    }
    catch (error) {
        throw new Error(error)
    }
});

// Eliminar un usuario
const deleteUser = asyncHandler(async (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json(deleteaUser);
    }
    catch (error) {
        throw new Error(error)
    }
});


// <----------------------------- Reset Password y Update Password ----------------------------->

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    validateMongoDbId(_id);

    const user = await User.findById(_id);

    // Verificar si la contraseña actual coincide
    const isMatch = await user.isPasswordMatched(currentPassword);
    if (!isMatch) {
        return res.status(400).json({ error: "La contraseña actual es incorrecta." });
    }

    // Verificar si las contraseñas nuevas coinciden
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Las contraseñas nuevas no coinciden." });
    }

    // Actualizar la contraseña y guardar el usuario
    user.password = newPassword;
    user.passwordChangedAt = Date.now(); // Actualizar el tiempo de cambio de contraseña
    await user.save();

    res.json({ message: "Contraseña actualizada exitosamente." });
});


module.exports = { createUser, loginUser, updateUser, getAllUser, getUser, deleteUser, updatePassword };