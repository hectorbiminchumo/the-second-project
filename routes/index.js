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
router.get("/login-option", routeGuard.usuarioNoLoggeado, indexController.loginOption)
router.get("/login-user", routeGuard.usuarioNoLoggeado, indexController.viewUserLogin)
router.get("/login-player", routeGuard.usuarioNoLoggeado, playersController.viewPlayerLogin)
// router.get("/signup-player",playersController.viewPlayerLogin)//donde me lleva

//Perfil de usuario
router.get("/users/profile/:userID", indexController.viewProfile)


//Perfil de player
router.get("/players/player-profile/:playerID", playersController.viewPlayerProfile)


// router.get("/players/player-profile/:playerID",playersController.profile)



//Enviar datos a BD

router.post("/login-user", routeGuard.usuarioNoLoggeado, indexController.userLogin)
router.post("/login-player", routeGuard.usuarioNoLoggeado, playersController.playerLogin)


//READ
//Lectura de jugadores creados
router.get("/players", playersController.viewPlayerList)
//Lectura de un jugador especifico
router.get("/players/:playerID", playersController.viewSinglePlayer)

//EDIT PLAYER

router.get("/players/:playerID/edit", playersController.viewEditPlayer)
router.post("/players/:playerID/edit", playersController.editPlayer)


//DELETE PLAYER
router.post("/players/:playerID/delete", playersController.deletePlayer)

//Logout
router.post("/logout", routeGuard.usuarioLoggeado, indexController.logout)
router.post("/logoutPlayer", playersController.logoutPlayer)




module.exports = router