//index.js principal

//1. IMPORTACIONES
const express = require("express")
const app      = express()
const hbs      = require("hbs")

const connectDB = require("./config/db")
const sessionManager = require("./config/session")

require("dotenv").config()


//2. MIDDLEWARES

console.log(sessionManager);
sessionManager(app)

app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")
app.use(express.urlencoded({extended:true}))

connectDB()
//3. RUTAS
//LAYOUT MIDDLEWARE
app.use((req, res, next)=>{
    res.locals.currentUser = req.session.currentUser
    next()
})

app.use((req, res, next) =>{
    res.locals.currentPlayer = req.session.currentPlayer
    next()
})
//home
//signup
//login
//catalogo
//categorias

// app.use((req, res, next) =>{
//     res.locals.currentUser = req.session.currentUser
//     next()
// })

app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))




//4. SERVIDOR
app.listen(process.env.PORT, () =>{
    console.log(`Servidor conectado en el puerto ${process.env.PORT}`)
})