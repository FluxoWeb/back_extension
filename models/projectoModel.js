const mongoose = require('mongoose');

const ProjectoSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            require: true,
        },
        resumen: {
            type: String,
            require: true,
        },
        carrera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Carrera',
        },
        materias: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Materia',
        }],
        docentes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Docente',
        }],
        alumnos_responsables: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Alumno',
        }],
        alumnos_colaboradores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Alumno',
        }],
        duracion: {
            inicio: {
                type: Date,
            },
            fin: {
                type: Date,
            }
        },
        presupuesto: {
            total: {
                type: Number,
                default: 0,
            }
        },
        objetivos: {
            type: String,
        },
        actividades: [{
            titulo: {
                type: String,
            },
            dia: {
                type: Date,
            },
            hora_extension: {
                type: String,
            },
        }],
        total_horas:{
            type: String,
            default: "0:00",
        },
        estado:{
            type: String,
            default: 'Nuevo',
        }
    },
    {
        timestamps: true,
    }
);


const Projecto = mongoose.model('Projecto', ProjectoSchema);

module.exports = Projecto;