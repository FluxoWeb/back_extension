const express = require('express');
const { createUser, getAllUser, getUser, updateUser, deleteUser, updatePassword } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear el usuario
router.post('/create', createUser);

// Ruta para obtener todos los usuarios
router.get('/get-all', authMiddleware, getAllUser);

// Ruta para obtener un usuario por ID
router.get('/get/:id', authMiddleware, getUser);

// Ruta para actualizar un usuario por ID
router.put('/update/:id', authMiddleware, updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/delete/:id', authMiddleware, deleteUser);

// Ruta para actualizar la contraseña de un usuario por ID
router.put('/updatePassword', authMiddleware, updatePassword);

module.exports = router;