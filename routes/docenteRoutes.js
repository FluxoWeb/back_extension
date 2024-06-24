const express = require('express');
const { createDocente, getAllDocente, getDocente, updateDocente, deleteDocente } = require('../controllers/docenteController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para cargar docente
router.post('/create', createDocente);

// Ruta para obtener todos los docentes
router.get('/get-all', authMiddleware, getAllDocente);

// Ruta para obtener un docente por ID
router.get('/get/:id', authMiddleware, getDocente);

// Ruta para actualizar un docente por ID
router.put('/update/:id', authMiddleware, updateDocente);

// Ruta para eliminar un docente por ID
router.delete('/delete/:id', authMiddleware, deleteDocente);

module.exports = router;