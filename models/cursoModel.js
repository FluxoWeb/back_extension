const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema(
    {
        curso: {
            type: String,
            require: true,
        },
        abrev: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);


const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;