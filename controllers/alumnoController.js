// Models de las tablas
const Alumno = require('../models/alumnoModel');
const Carrera = require('../models/carreraModel');
const Curso = require('../models/cursoModel');
const Promo = require('../models/promoModel');

// Librerias
const asyncHandler = require('express-async-handler');

// Utils
const validateMongoDbId = require('../utils/validateMongoID');

// Funcion para crear un alumno
const createAlumno = asyncHandler(async (req, res) => {
    const { matricula, email, carrera, curso, promo } = req.body;

    // Verificar si ya existe el alumno
    const findAlumno = await Alumno.findOne({ matricula, email });

    // Verificar si existen la carrera, curso y promo
    const carreraExistente = await Carrera.findById(carrera);
    const cursoExistente = await Curso.findById(curso);
    const promoExistente = await Promo.findById(promo);

    const errores = [];

    if (!carreraExistente) {
        errores.push("La carrera especificada no existe.");
    }

    if (!cursoExistente) {
        errores.push("El curso especificado no existe.");
    }

    if (!promoExistente) {
        errores.push("La promoción especificada no existe.");
    }

    if (errores.length > 0) {
        return res.status(400).json({ success: false, errores });
    }

    // Crear Alumno
    if (!findAlumno) {
        const newAlumno = await Alumno.create(req.body);
        return res.status(201).json({ success: true, message: "Alumno creado exitosamente.", alumno: newAlumno });
    } else {
        throw new Error("Ya existe este Alumno");
    }
});


// Funcion para actualizar alumno
const updateAlumno = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { carrera, curso, promo } = req.body;
    validateMongoDbId(id);

    const errores = [];

    // Verificar si existen la carrera, curso y promo solo si se proporcionaron en la solicitud
    if (carrera) {
        const carreraExistente = await Carrera.findById(carrera);
        if (!carreraExistente) {
            errores.push("La carrera especificada no existe.");
        }
    }

    if (curso) {
        const cursoExistente = await Curso.findById(curso);
        if (!cursoExistente) {
            errores.push("El curso especificado no existe.");
        }
    }

    if (promo) {
        const promoExistente = await Promo.findById(promo);
        if (!promoExistente) {
            errores.push("La promoción especificada no existe.");
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({ success: false, errores });
    }

    try {
        const updateFields = {
            nombre: req?.body?.nombre,
            apellido: req?.body?.apellido,
            ci: req?.body?.ci,
            matricula: req?.body?.matricula,
            email: req?.body?.email,
            total_horas: req?.body?.total_horas,
        };

        // Actualizar los campos carrera, curso y promo solo si se proporcionaron en la solicitud
        if (carrera) updateFields.carrera = req.body.carrera;
        if (curso) updateFields.curso = req.body.curso;
        if (promo) updateFields.promo = req.body.promo;

        const updatedAlumno = await Alumno.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        res.json(updatedAlumno);
    } catch (error) {
        throw new Error(error);
    }
});

// Eliminar a un alumno
const deleteAlumno = asyncHandler(async (req, res) => {
    //console.log(req.params);
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteaAlumno = await Alumno.findByIdAndDelete(id);
        res.json(deleteaAlumno);
    }
    catch (error) {
        throw new Error(error)
    }
});


// Funcion para obtener a todos los alumnos
const getAllAlumno = asyncHandler(async (req, res) => {
    try {
        const getAlumnos = await Alumno.find().populate('carrera', 'carrera abrev').populate('curso', 'curso abrev').populate('promo', 'promo abrev');
        res.json(getAlumnos);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Funcion para obtener a un alumno
const getAlumno = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaAlumno = await Alumno.findById(id).populate('carrera', 'carrera abrev').populate('curso', 'curso abrev').populate('promo', 'promo abrev');
        res.json(getaAlumno);
    }
    catch (error) {
        throw new Error(error)
    }
});


// Funcion para obtener un alumno por matrícula
const getAlumnoByMatricula = asyncHandler(async (req, res) => {
    const { matricula } = req.params;
    try {
        const alumno = await Alumno.findOne({ matricula })
            .populate('carrera', 'carrera abrev')
            .populate('curso', 'curso abrev')
            .populate('promo', 'promo abrev')
            .populate({
                path: 'projectos',
                select: 'titulo resumen carrera docentes alumnos_responsables alumnos_colaboradores duracion presupuesto objetivos actividades total_horas estado',
                populate: [
                    { path: 'alumnos_responsables', select: 'nombre apellido matricula email' },
                    { path: 'alumnos_colaboradores', select: 'nombre apellido matricula email' },
                    { path: 'actividades', select: 'titulo dia hora_extension' }
                ]
            })
            .populate({
                path: 'total_horas_extra.projecto',
                select: 'titulo resumen' // Ajusta los campos que deseas seleccionar del projecto
            });
        
        if (!alumno) {
            return res.status(404).json({ success: false, message: 'Alumno no encontrado' });
        }
        
        res.json(alumno);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



module.exports = { createAlumno, updateAlumno, deleteAlumno, getAllAlumno, getAlumno, getAlumnoByMatricula };