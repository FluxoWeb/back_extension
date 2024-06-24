const Promo = require('../models/promoModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');

// Funcion para crear promo
const createPromo = asyncHandler(async (req, res) => {
    const promo = req.body.promo;
    const findPromo = await Promo.findOne({ promo: promo });

    // Crear Promo
    if (!findPromo) {
        const newPromo = await Promo.create(req.body);
        res.json(newPromo);
    }
    else {
        throw new Error("Ya existe esta Promo");
    }
});

// Funcion para editar promo
const updatePromo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const UpdatePromo = await Promo.findByIdAndUpdate(
            id,
            {
                promo: req?.body?.promo,
                abrev: req?.body?.abrev,
            },
            {
                new: true,
            }
        );
        res.json(UpdatePromo);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Eliminar una promo
const deletePromo = asyncHandler(async (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaPromo = await Promo.findByIdAndDelete(id);
        res.json(deleteaPromo);
    }
    catch (error) {
        throw new Error(error)
    }
});

// Funcion para obtener todas las promos
const getAllPromo = asyncHandler(async (req, res) => {
    try {
        const getPromos = await Promo.find();
        res.json(getPromos);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener una promo
const getPromo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaPromo = await Promo.findById(id);
        res.json(getaPromo);
    }
    catch (error) {
        throw new Error(error)
    }
});


module.exports = { createPromo, updatePromo, deletePromo, getAllPromo, getPromo }