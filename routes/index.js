//index.js routes

const express   = require("express")
const router    = express.Router()

const indexController   = require("./../controllers/index.Controller")
const playersController = require("./../controllers/playersController")

router.get("/", indexController.home)

//Crear usuario
//Mostrar formulario
router.get("/sign-option", indexController.signOption)
router.get("/signup-user", indexController.viewUserRegister )
router.get("/signup-player", playersController.signupPlayer)

//enviar datos a BD
router.post("/signup-user", indexController.userRegister)


//Loggear usuario
//mostrar login
router.get("/login-user", indexController.viewUserLogin)

//Enviar datos a BD

router.post("/login-user", indexController.userLogin)

//Logout
router.get("/logout", indexController.logout)

router.get("/catalogo", indexController.catalogo)


module.exports = router