const Materia = require('../models/materiaModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');

// Funcion para crear materia
const createMateria = asyncHandler(async (req, res) => {
    const materia = req.body.materia;
    const findMateria = await Materia.findOne({ materia: materia });

    // Crear Materia
    if (!findMateria) {
        const newMateria = await Materia.create(req.body);
        res.json(newMateria);
    }
    else {
        throw new Error("Ya existe esta Materia");
    }
});


// Funcion para editar materia
const updateMateria = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedMateria = await Materia.findByIdAndUpdate(
            id,
            {
                materia: req?.body?.materia,
                abrev: req?.body?.abrev,
            },
            {
                new: true,
            }
        );
        res.json(updatedMateria);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Eliminar una materia
const deleteMateria = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedMateria = await Materia.findByIdAndDelete(id);
        res.json(deletedMateria);
    }
    catch (error) {
        throw new Error(error)
    }
});

// Funcion para obtener todas las materias
const getAllMateria = asyncHandler(async (req, res) => {
    try {
        const getMaterias = await Materia.find();
        res.json(getMaterias);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener una materia
const getMateria = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getMateria = await Materia.findById(id);
        res.json(getMateria);
    }
    catch (error) {
        throw new Error(error)
    }
});

module.exports = { createMateria, updateMateria, deleteMateria, getAllMateria, getMateria };
