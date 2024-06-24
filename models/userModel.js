const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
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
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        rol: {
            type: String,
            default: 'User',
            require: true,
        },
        carrera: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Carrera',
        },
        curso: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Curso',
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);


// Encriptacion del password
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutos
    return resettoken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;