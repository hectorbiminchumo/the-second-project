//models/Player

//Importaciones
const mongoose = require("mongoose")


//Schema
const playerSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Se necesita un email"],
        match: [/^\S+@\S+\.\S+$/, "Ingresa un email válido"],
        unique: true,
        lowercase: true,
        trim: true
    },

    usuario: {
        type: String,
        required: [true, "Se necesita un nombre de usuario"],
        unique: [true, "Usuario no disponible"],
        trim: true
    },

    passwordEncriptado: String,
    Edad: Number,
    Posición: String,
    Ciudad: String,
    Pierna: String,
    Descripción: String,
    Tarifa: Number,
    photoUrl: String,
    Campeonatos: String,


})

//Modelo
const User = mongoose.model("User", playerSchema)

//Exportación
module.exports = Player