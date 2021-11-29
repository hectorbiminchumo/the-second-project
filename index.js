//1. IMPORTACIONES
const express = require("express")
const app      = express()
const hbs      = require("hbs")

const connectDB = require("./config/db")

require("dotenv").config()


//2. MIDDLEWARES

app.use(express.static("public"))

connectDB()
//3. RUTAS



//4. SERVIDOR
app.listen(process.env.PORT, () =>{
    console.log(`Servidor conectado en el puerto ${process.env.PORT}`)
})
