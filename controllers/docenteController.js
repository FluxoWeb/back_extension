const Docente = require('../models/docenteModel');
const Materia = require('../models/materiaModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');

// Funcion para crear Docente
const createDocente = asyncHandler(async (req, res) => {
    const { nombre, ci, materia } = req.body;
    try {
        // Verificar si la materia especificada existe
        const findMateria = await Materia.findById(materia);
        if (!findMateria) {
            throw new Error("La materia especificada no existe");
        }

        // Verificar si ya existe un docente con el mismo nombre, ci y materia
        const findDocente = await Docente.findOne({ nombre: nombre, ci: ci, materia: materia });

        // Crear Docente si no existe
        if (!findDocente) {
            const newDocente = await Docente.create(req.body);
            res.json(newDocente);
        } else {
            throw new Error("Ya existe este Docente");
        }
    } catch (error) {
        throw new Error(error);
    }
});


// Funcion para editar Docente
const updateDocente = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedDocente = await Docente.findByIdAndUpdate(
            id,
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                ci: req.body.ci,
                email: req.body.email,
                materia: req.body.materia,
            },
            {
                new: true,
            }
        );
        res.json(updatedDocente);
    } catch (error) {
        throw new Error(error);
    }
});

// Eliminar un Docente
const deleteDocente = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedDocente = await Docente.findByIdAndDelete(id);
        res.json(deletedDocente);
    } catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener todas las Docentes
const getAllDocente = asyncHandler(async (req, res) => {
    try {
        const getDocentes = await Docente.find().populate('materia', 'materia abrev');
        res.json(getDocentes);
    } catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener un Docente
const getDocente = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaDocente = await Docente.findById(id).populate('materia', 'materia abrev');
        res.json(getaDocente);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createDocente, updateDocente, deleteDocente, getAllDocente, getDocente };
