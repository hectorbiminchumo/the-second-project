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
    edad: Number,
    posicion: {
        type:String,
        trim: true},
    ciudad: {
        type:String,
        trim: true},
    pierna: {
        type:String,
        trim: true},
    descripcion: String,
        
    tarifa: {
        type:Number,
        trim: true},
    photoUrl: {
        type:String,
        trim:true},
    campeonatos: {
        type:String,
        trim:true}


})

//Modelo
const Player = mongoose.model("Player", playerSchema)

//Exportación
module.exports = Player