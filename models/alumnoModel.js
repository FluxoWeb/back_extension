const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
        },
        apellido: {
            type: String,
            require: true,
        },
        ci: {
            type: Number,
            require: true,
        },
        matricula: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        rol: {
            type: String,
            default: 'Alumno',
            require: true,
        },
        total_horas:{
            horas:{
                type: String,
            },
            abrev:{
                types: String,
            },
        },
        total_horas_extra:[{
            horas:{
                type: String,
            },
            projecto:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Projecto',
            },
        }],
        carrera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Carrera',
        },
        curso: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Curso',
        },
        promo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Promo',
        },
        projectos:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projecto',
        }]
    },
    {
        timestamps: true,
    }
);


const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;