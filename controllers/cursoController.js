const Curso = require('../models/cursoModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');

// Funcion para crear curso
const createCurso = asyncHandler(async (req, res) => {
    const curso = req.body.curso;
    const findCurso = await Curso.findOne({ curso: curso });

    // Crear Promo
    if (!findCurso) {
        const newCurso = await Curso.create(req.body);
        res.json(newCurso);
    }
    else {
        throw new Error("Ya existe esta Curso");
    }
});


// Funcion para editar curso
const updateCurso = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const UpdateCurso = await Curso.findByIdAndUpdate(
            id,
            {
                curso: req?.body?.curso,
                abrev: req?.body?.abrev,
            },
            {
                new: true,
            }
        );
        res.json(UpdateCurso);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Eliminar un curso
const deleteCurso = asyncHandler(async (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaCurso = await Curso.findByIdAndDelete(id);
        res.json(deleteaCurso);
    }
    catch (error) {
        throw new Error(error)
    }
});

// Funcion para obtener todos los cursos
const getAllCurso = asyncHandler(async (req, res) => {
    try {
        const getCursos = await Curso.find();
        res.json(getCursos);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener un curso
const getCurso = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaCurso = await Curso.findById(id);
        res.json(getaCurso);
    }
    catch (error) {
        throw new Error(error)
    }
});

module.exports = { createCurso, updateCurso, deleteCurso, getAllCurso, getCurso }