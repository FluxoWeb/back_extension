const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema(
    {
        carrera: {
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


const Carrera = mongoose.model('Carrera', carreraSchema);

module.exports = Carrera;