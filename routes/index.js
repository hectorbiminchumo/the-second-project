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
router.get("/login-player", playersController.viewPlayerLogin)
router.get("/login-option", indexController.loginOption)
router.get("/signup-player",playersController.viewPlayerLogin)
router.get("/players/player-profile", playersController.profile)
//Enviar datos a BD

router.post("/login-user", indexController.userLogin)
router.post("/login-player", playersController.playerLogin)

//Listado de jugadores
router.get("/players", playersController.viewPlayerList)
//Logout
router.get("/logout", indexController.logout)

router.get("/catalogo", indexController.catalogo)


module.exports = router