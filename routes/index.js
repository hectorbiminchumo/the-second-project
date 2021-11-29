const express   = require("express")
const router    = express.Router()

const indexController   = require("./../controllers/index.Controller")


router.get("/", indexController.home)

//Crear usuario
//Mostrar formulario


//enviar datos a BD
router.post("/signup", indexController.register)

//mostrar login
router.get("/login", indexController.viewLogin)
router.post("/login", indexController.login)
router.get("/logout", indexController.logout)

router.get("/catalogo", indexController.catalogo)
router.get("/sign-option", indexController.signOption)

module.exports = router