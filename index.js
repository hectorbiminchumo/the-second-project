//1. IMPORTACIONES
const express = require("express")
const app      = express()
const hbs      = require("hbs")

const connectDB = require("./config/db")

require("dotenv").config()


//2. MIDDLEWARES

app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")
app.use(express.urlencoded({extended:true}))

connectDB()
//3. RUTAS

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
app.use("/signup", require("./routes/index"))
app.use("/login", require("./routes/index"))
app.use("/users", require("./routes/index"))
app.use("/catalogo", require("./routes/index"))


//4. SERVIDOR
app.listen(process.env.PORT, () =>{
    console.log(`Servidor conectado en el puerto ${process.env.PORT}`)
})
