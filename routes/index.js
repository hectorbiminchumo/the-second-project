//index.js routes

const express   = require("express")
const router    = express.Router()

const indexController   = require("./../controllers/index.Controller")
const playersController = require("./../controllers/playersController")

const routeGuard        = require("./../middlewares/route-guard")

router.get("/", indexController.home)

//Crear usuario
//Mostrar formulario
router.get("/sign-option",routeGuard.usuarioNoLoggeado, indexController.signOption)
router.get("/signup-user", routeGuard.usuarioNoLoggeado, indexController.viewUserRegister )
router.get("/signup-player", routeGuard.usuarioNoLoggeado,playersController.viewPlayerRegister)
//enviar datos a BD
router.post("/signup-user", routeGuard.usuarioNoLoggeado, indexController.userRegister)
router.post("/signup-player", playersController.playerRegister)


//Loggear usuario
//mostrar login
router.get("/login-user", routeGuard.usuarioNoLoggeado, indexController.viewUserLogin)
router.get("/login-player", routeGuard.usuarioNoLoggeado, playersController.viewPlayerLogin)
router.get("/login-option", routeGuard.usuarioNoLoggeado, indexController.loginOption)
// router.get("/signup-player",playersController.viewPlayerLogin)//donde me lleva
router.get("/players/player-profile",playersController.profile)
//Enviar datos a BD

router.post("/login-user", routeGuard.usuarioNoLoggeado, indexController.userLogin)
router.post("/login-player", routeGuard.usuarioNoLoggeado, playersController.playerLogin)

//Listado de jugadores
router.get("/players", playersController.viewPlayerList)
router.get("/players/:playerID", playersController.viewSinglePlayer)
//Logout
router.post("/logout", routeGuard.usuarioLoggeado, indexController.logout)
router.post("/logoutPlayer", playersController.logoutPlayer)




module.exports = router