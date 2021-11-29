
//models/User

//Importaciones
const mongoose = require("mongoose")

//Schema
const userSchema = mongoose.Schema({
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

    passwordEncriptado: String

   
})
 //Modelo
 const User = mongoose.model("User", userSchema)

 //Exportación
 module.exports = User


    