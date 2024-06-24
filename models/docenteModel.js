const mongoose = require('mongoose');

const DocenteSchema = new mongoose.Schema(
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
        email: {
            type: String,
            require: true,
            unique: true,
        },
        materia: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Materia',
        },
    },
    {
        timestamps: true,
    }
);


const Docente = mongoose.model('Docente', DocenteSchema);

module.exports = Docente;