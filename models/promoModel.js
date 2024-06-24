const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema(
    {
        promo: {
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


const Promo = mongoose.model('Promo', promoSchema);

module.exports = Promo;