const Carrera = require('../models/carreraModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');

// Funcion para crear carrera
const createCarrera = asyncHandler(async (req, res) => {
    const carrera = req.body.carrera;
    const findCarrera = await Carrera.findOne({ carrera: carrera });

    // Crear Carrera
    if (!findCarrera) {
        const newCarrera = await Carrera.create(req.body);
        res.json(newCarrera);
    }
    else {
        throw new Error("Ya existe esta Carrera");
    }
});


// Funcion para editar carrera
const updateCarrera = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const UpdateCarrera = await Carrera.findByIdAndUpdate(
            id,
            {
                carrera: req?.body?.carrera,
                abrev: req?.body?.abrev,
            },
            {
                new: true,
            }
        );
        res.json(UpdateCarrera);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Eliminar una carrera
const deleteCarrera = asyncHandler(async (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaCarrera = await Carrera.findByIdAndDelete(id);
        res.json(deleteaCarrera);
    }
    catch (error) {
        throw new Error(error)
    }
});

// Funcion para obtener todas las carreras
const getAllCarrera = asyncHandler(async (req, res) => {
    try {
        const getCarreras = await Carrera.find();
        res.json(getCarreras);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener una carrera
const getCarrera = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaCarrera = await Carrera.findById(id);
        res.json(getaCarrera);
    }
    catch (error) {
        throw new Error(error)
    }
});

module.exports = { createCarrera, updateCarrera, deleteCarrera, getAllCarrera, getCarrera }