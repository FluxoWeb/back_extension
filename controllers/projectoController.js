const Projecto = require('../models/projectoModel');
const Alumno = require('../models/alumnoModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoID');
const { timeStringToMinutes, minutesToTimeString } = require('../utils/TimeToString');

// Función para crear proyecto
const createProjecto = asyncHandler(async (req, res) => {
    try {
        const newProjecto = await Projecto.create(req.body);
        res.json(newProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para actualizar proyecto por ID
const updateProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para eliminar proyecto por ID
const deleteProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedProjecto = await Projecto.findByIdAndDelete(id);
        res.json(deletedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para obtener todos los proyectos
const getAllProjecto = asyncHandler(async (req, res) => {
    try {
        const proyectos = await Projecto.find().populate('carrera', 'carrera abrev').populate('materias', 'materia abrev').populate('docentes', 'nombre apellido').populate('alumnos_responsables', 'nombre apellido ci').populate('alumnos_colaboradores', 'nombre apellido ci');
        res.json(proyectos);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para obtener proyecto por ID
const getProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const proyecto = await Projecto.findById(id).populate('carrera', 'carrera abrev').populate('materias', 'materia abrev').populate('docentes', 'nombre apellido').populate('alumnos_responsables', 'nombre apellido ci').populate('alumnos_colaboradores', 'nombre apellido ci');
        res.json(proyecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para finalizar proyecto
const finalizeProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { alumnos_responsables, alumnos_colaboradores } = req.body;

    validateMongoDbId(id);

    try {
        const proyecto = await Projecto.findById(id).populate('actividades');
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        const alumnosActualizados = [];

        const actualizarHorasAlumno = async (alumnoId, actividadesIds, horaExtra) => {
            validateMongoDbId(alumnoId);
            const alumno = await Alumno.findById(alumnoId);
            if (!alumno) {
                throw new Error(`Alumno con ID ${alumnoId} no encontrado`);
            }

            let totalHorasMinutos = 0;

            actividadesIds.forEach(actividadId => {
                const actividad = proyecto.actividades.find(act => act._id.toString() === actividadId);
                if (actividad) {
                    totalHorasMinutos += timeStringToMinutes(actividad.hora_extension);
                }
            });

            if (horaExtra) {
                totalHorasMinutos += timeStringToMinutes(horaExtra);
            }

            const totalHorasAlumno = timeStringToMinutes(alumno.total_horas.horas || '00:00') + totalHorasMinutos;
            alumno.total_horas.horas = minutesToTimeString(totalHorasAlumno);
            alumno.projectos.push(proyecto._id);

            // Inicializar el campo total_horas_extra si no existe
            if (!alumno.total_horas_extra) {
                alumno.total_horas_extra = [];
            }

            // Si tiene horas extra, agregar a total_horas_extra
            if (horaExtra) {
                alumno.total_horas_extra.push({
                    horas: horaExtra,
                    projecto: proyecto._id
                });
            }

            await alumno.save();
            alumnosActualizados.push(alumno);
        };

        // Procesar alumnos responsables
        for (const alumnoData of alumnos_responsables) {
            await actualizarHorasAlumno(alumnoData.id, alumnoData.actividades, alumnoData.hora_extra);
        }

        // Procesar alumnos colaboradores
        for (const alumnoData of alumnos_colaboradores) {
            await actualizarHorasAlumno(alumnoData.id, alumnoData.actividades, null);
        }

        proyecto.estado = 'Finalizado';
        await proyecto.save();

        res.json({ proyecto, alumnosActualizados });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// <----------------------------- Apartado de Materias ----------------------------->

// Función para agregar materia a un proyecto por ID
const addMateriaToProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { materiaId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(materiaId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $addToSet: { materias: materiaId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para eliminar materia de un proyecto por ID
const removeMateriaFromProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { materiaId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(materiaId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $pull: { materias: materiaId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// <----------------------------- Apartado de Docentes ----------------------------->

// Función para agregar docente a un proyecto por ID
const addDocenteToProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { docenteId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(docenteId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $addToSet: { docentes: docenteId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para eliminar docente de un proyecto por ID
const removeDocenteFromProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { docenteId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(docenteId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $pull: { docentes: docenteId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// <----------------------------- Apartado de Alumnos Responsables ----------------------------->


// Función para agregar alumno responsable a un proyecto por ID
const addAlumnoResponsableToProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { alumnoId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(alumnoId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $addToSet: { alumnos_responsables: alumnoId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para eliminar alumno responsable de un proyecto por ID
const removeAlumnoResponsableFromProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { alumnoId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(alumnoId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $pull: { alumnos_responsables: alumnoId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// <----------------------------- Apartado de Alumnos Colaboradores ----------------------------->

// Función para agregar alumno colaborador a un proyecto por ID
const addAlumnoColaboradorToProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { alumnoId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(alumnoId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $addToSet: { alumnos_colaboradores: alumnoId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para eliminar alumno colaborador de un proyecto por ID
const removeAlumnoColaboradorFromProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { alumnoId } = req.body;
    validateMongoDbId(id);
    validateMongoDbId(alumnoId);
    try {
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, { $pull: { alumnos_colaboradores: alumnoId } }, { new: true });
        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});


// <----------------------------- Apartado de Actividades ----------------------------->

// Función para agregar una actividad a un proyecto por ID
const addActividadToProjecto = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actividad = req.body;
    validateMongoDbId(id);

    try {
        // Primero, obtenemos el proyecto actual
        const proyecto = await Projecto.findById(id);

        // Convertimos el tiempo de la nueva actividad a minutos
        const nuevaActividadMinutos = timeStringToMinutes(actividad.hora_extension);

        // Sumamos el tiempo de la nueva actividad al total de horas actual
        const totalHorasActualesMinutos = proyecto.actividades.reduce((total, act) => total + timeStringToMinutes(act.hora_extension), 0);
        const nuevoTotalMinutos = totalHorasActualesMinutos + nuevaActividadMinutos;

        // Convertimos el nuevo total de minutos a hh:mm
        const nuevoTotalHoras = minutesToTimeString(nuevoTotalMinutos);

        // Actualizamos el proyecto con la nueva actividad y el nuevo total de horas
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, {
            $push: { actividades: actividad },
            total_horas: nuevoTotalHoras
        }, { new: true });

        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para eliminar una actividad de un proyecto por ID
const removeActividadFromProjecto = asyncHandler(async (req, res) => {
    const { id, actividadId } = req.params;
    validateMongoDbId(id);
    validateMongoDbId(actividadId);

    try {
        // Primero, obtenemos el proyecto actual
        const proyecto = await Projecto.findById(id);

        // Encontramos la actividad que vamos a eliminar
        const actividadAEliminar = proyecto.actividades.find(act => act._id.toString() === actividadId);
        if (!actividadAEliminar) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Convertimos el tiempo de la actividad a eliminar a minutos
        const actividadEliminarMinutos = timeStringToMinutes(actividadAEliminar.hora_extension);

        // Restamos el tiempo de la actividad eliminada del total de horas actual
        const totalHorasActualesMinutos = proyecto.actividades.reduce((total, act) => total + timeStringToMinutes(act.hora_extension), 0);
        const nuevoTotalMinutos = totalHorasActualesMinutos - actividadEliminarMinutos;

        // Convertimos el nuevo total de minutos a hh:mm
        const nuevoTotalHoras = minutesToTimeString(nuevoTotalMinutos);

        // Actualizamos el proyecto eliminando la actividad y ajustando el total de horas
        const updatedProjecto = await Projecto.findByIdAndUpdate(id, {
            $pull: { actividades: { _id: actividadId } },
            total_horas: nuevoTotalHoras
        }, { new: true });

        res.json(updatedProjecto);
    } catch (error) {
        throw new Error(error);
    }
});

// Función para actualizar una actividad en un proyecto por ID
const updateActividadInProjecto = asyncHandler(async (req, res) => {
    const { id, actividadId } = req.params;
    const nuevaActividad = req.body;
    validateMongoDbId(id);
    validateMongoDbId(actividadId);

    try {
        // Primero, obtenemos el proyecto actual
        const proyecto = await Projecto.findById(id);

        // Encontramos la actividad existente
        const actividadExistente = proyecto.actividades.find(act => act._id.toString() === actividadId);
        if (!actividadExistente) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Convertimos el tiempo de la actividad existente a minutos
        const actividadExistenteMinutos = timeStringToMinutes(actividadExistente.hora_extension);

        // Convertimos el tiempo de la nueva actividad a minutos
        const nuevaActividadMinutos = timeStringToMinutes(nuevaActividad.hora_extension);

        // Calculamos el nuevo total de minutos
        const totalHorasActualesMinutos = proyecto.actividades.reduce((total, act) => total + timeStringToMinutes(act.hora_extension), 0);
        const nuevoTotalMinutos = totalHorasActualesMinutos - actividadExistenteMinutos + nuevaActividadMinutos;

        // Convertimos el nuevo total de minutos a hh:mm
        const nuevoTotalHoras = minutesToTimeString(nuevoTotalMinutos);

        // Actualizamos la actividad en el proyecto
        const updatedActividades = proyecto.actividades.map(act => {
            if (act._id.toString() === actividadId) {
                return { ...act.toObject(), ...nuevaActividad };
            }
            return act;
        });

        // Actualizamos el proyecto con la actividad modificada y el nuevo total de horas
        proyecto.actividades = updatedActividades;
        proyecto.total_horas = nuevoTotalHoras;
        await proyecto.save();

        res.json(proyecto);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
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
    finalizeProjecto,
};
