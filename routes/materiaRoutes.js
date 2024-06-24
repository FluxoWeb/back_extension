const express = require('express');
const { createMateria, getAllMateria, getMateria, updateMateria, deleteMateria } = require('../controllers/materiaController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear una materia
router.post('/create', createMateria);

// Ruta para obtener todas las materias
router.get('/get-all', authMiddleware, getAllMateria);

// Ruta para obtener una materia por ID
router.get('/get/:id', authMiddleware, getMateria);

// Ruta para actualizar una materia por ID
router.put('/update/:id', authMiddleware, updateMateria);

// Ruta para eliminar una materia por ID
router.delete('/delete/:id', authMiddleware, deleteMateria);

module.exports = router;
