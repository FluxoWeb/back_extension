const express = require('express');
const { createCarrera, getAllCarrera, getCarrera, updateCarrera, deleteCarrera } = require('../controllers/carreraController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear una carrera
router.post('/create', createCarrera);

// Ruta para obtener todas las carreras
router.get('/get-all', authMiddleware, getAllCarrera);

// Ruta para obtener una carrera por ID
router.get('/get/:id', authMiddleware, getCarrera);

// Ruta para actualizar una carrera por ID
router.put('/update/:id', authMiddleware, updateCarrera);

// Ruta para eliminar una carrera por ID
router.delete('/delete/:id', authMiddleware, deleteCarrera);

module.exports = router;