//1. IMPORTACIONES

const session = require("express-session")
const MongoStore = require("connect-mongo");


//2. GESTION DE SESION
const sessionManager = (app) => {
    console.log("Activando y gestionando sesiones");

    //a. Establecer seguridad y flexibilidad ante servidores externos, puntualmente Cloud (Heroku)

    app.set("trust proxy",1)

    //b. Establecer la configuracion de la sesion
    app.use(session({
        secret: process.env.SESSION,
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 86400000
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    }))
}
//3. EXPORTACION 
module.exports = sessionManager