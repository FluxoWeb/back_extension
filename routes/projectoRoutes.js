const express = require('express');
const {
    createProjecto,
    updateProjecto,
    deleteProjecto,
    getAllProjecto,
    getProjecto,
    addMateriaToProjecto,
    removeMateriaFromProjecto,
    addDocenteToProjecto,
    removeDocenteFromProjecto,
    addAlumnoResponsableToProjecto,
    removeAlumnoResponsableFromProjecto,
    addAlumnoColaboradorToProjecto,
    removeAlumnoColaboradorFromProjecto,
    addActividadToProjecto,
    removeActividadFromProjecto,
    updateActividadInProjecto,
    finalizeProjecto
} = require('../controllers/projectoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para crear un proyecto
router.post('/create', authMiddleware, createProjecto);

// Ruta para obtener todos los proyectos
router.get('/get-all', authMiddleware, getAllProjecto);

// Ruta para obtener un proyecto por ID
router.get('/get/:id', authMiddleware, getProjecto);

// Ruta para actualizar un proyecto por ID
router.put('/update/:id', authMiddleware, updateProjecto);

// Ruta para eliminar un proyecto por ID
router.delete('/delete/:id', authMiddleware, deleteProjecto);

// Ruta para finalizar un proyecto por ID
router.post('/finalize/:id', authMiddleware, finalizeProjecto);

// <----------------------------- Apartado de Materias ----------------------------->

// Ruta para agregar materia a un proyecto por ID
router.post('/:id/materias/add', authMiddleware, addMateriaToProjecto);

// Ruta para eliminar materia de un proyecto por ID
router.delete('/:id/materias/remove', authMiddleware, removeMateriaFromProjecto);

// <----------------------------- Apartado de Docentes ----------------------------->

// Ruta para agregar docente a un proyecto por ID
router.post('/:id/docentes/add', authMiddleware, addDocenteToProjecto);

// Ruta para eliminar docente de un proyecto por ID
router.delete('/:id/docentes/remove', authMiddleware, removeDocenteFromProjecto);

// <----------------------------- Apartado de Alumnos Responsables ----------------------------->

// Ruta para agregar alumno responsable a un proyecto por ID
router.post('/:id/alumnos_responsables/add', authMiddleware, addAlumnoResponsableToProjecto);

// Ruta para eliminar alumno responsable de un proyecto por ID
router.delete('/:id/alumnos_responsables/remove', authMiddleware, removeAlumnoResponsableFromProjecto);

// <----------------------------- Apartado de Alumnos Colaboradores ----------------------------->

// Ruta para agregar alumno colaborador a un proyecto por ID
router.post('/:id/alumnos_colaboradores/add', authMiddleware, addAlumnoColaboradorToProjecto);

// Ruta para eliminar alumno colaborador de un proyecto por ID
router.delete('/:id/alumnos_colaboradores/remove', authMiddleware, removeAlumnoColaboradorFromProjecto);

// <----------------------------- Apartado de Actividades ----------------------------->

// Ruta para agregar una actividad a un proyecto por ID
router.post('/:id/actividades/add', authMiddleware, addActividadToProjecto);

// Ruta para eliminar una actividad de un proyecto por ID
router.delete('/:id/actividades/remove/:actividadId', authMiddleware, removeActividadFromProjecto);

// Ruta para actualizar una actividad en un proyecto por ID
router.put('/:id/actividades/update/:actividadId', authMiddleware, updateActividadInProjecto);

module.exports = router;
