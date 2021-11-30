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
router.get("/signup-player", playersController.viewPlayerRegister)

//enviar datos a BD
router.post("/signup-user", indexController.userRegister)
router.post("/signup-player", playersController.playerRegister)


//Loggear usuario
//mostrar login
router.get("/login-user", indexController.viewUserLogin)
router.get("/login-option", indexController.loginOption)
router.get("/signup-player",playersController.viewPlayerLogin)

//Enviar datos a BD

router.post("/login-user", indexController.userLogin)
router.post("/login-player", playersController.playerLogin)

//Logout
router.get("/logout", indexController.logout)

router.get("/catalogo", indexController.catalogo)


module.exports = router