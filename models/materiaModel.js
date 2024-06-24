const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema(
    {
        materia: {
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


const Materia = mongoose.model('Materia', materiaSchema);

module.exports = Materia;