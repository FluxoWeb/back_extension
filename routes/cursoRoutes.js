const express = require('express');
const { createCurso, getAllCurso, getCurso, updateCurso, deleteCurso } = require('../controllers/cursoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear el curso
router.post('/create', createCurso);

// Ruta para obtener todos los cursos
router.get('/get-all', authMiddleware, getAllCurso);

// Ruta para obtener un curso por ID
router.get('/get/:id', authMiddleware, getCurso);

// Ruta para actualizar un curso por ID
router.put('/update/:id', authMiddleware, updateCurso);

// Ruta para eliminar un curso por ID
router.delete('/delete/:id', authMiddleware, deleteCurso);

module.exports = router;