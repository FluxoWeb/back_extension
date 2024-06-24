const express = require('express');
const { createAlumno, getAllAlumno, getAlumno, updateAlumno, deleteAlumno, getAlumnoByMatricula } = require('../controllers/alumnoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear el alumno
router.post('/create',createAlumno );

// Ruta para obtener todos los alumnos
router.get('/get-all', authMiddleware, getAllAlumno);

// Ruta para obtener un alumno por ID
router.get('/get/:id', authMiddleware, getAlumno);

// Ruta para obtener un alumno por matrícula
router.get('/get-by-matricula/:matricula', getAlumnoByMatricula);

// Ruta para actualizar un alumno por ID
router.put('/update/:id', authMiddleware, updateAlumno);

// Ruta para eliminar un alumno por ID
router.delete('/delete/:id', authMiddleware, deleteAlumno);

module.exports = router;