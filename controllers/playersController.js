//playersController.js

const Player = require("../models/Player")
const bcryptjs = require("bcryptjs")


exports.viewPlayerRegister = async (req,res) => {
    res.render("signup-player")
}



exports.playerRegister = async(req, res) =>{

    

//OBTENCION DE DATOS DEL FORMULARIO
    const email = req.body.email
    const usuario = req.body.usuario
    const password = req.body.password
    const edad = req.body.edad
    const posicion = req.body.posicion
    const ciudad = req.body.ciudad
    const tarifa = req.body.tarifa
    const pierna = req.body.pierna
    const descripcion = req.body.descripcion
    const photoUrl = req.body.photoUrl
    const campeonatos = req.body.campeonatos




    if(!email|| !password ||!usuario ||!edad ||!posicion ||!ciudad ||!pierna || !descripcion || !photoUrl || !campeonatos){
        res.render("signup-player",{
            errorMessage:"Uno o mas campos vacios. Completalos"
        })
        return
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if(!regex.test(password)){
        res.render("signup-player",{
            errorMessage:"Tu password debe de contener 6 caracteres, minimo un numero y una mayuscula"
        })
        return
    }
//ENCRIPTADO DE PASSWORD
    try{
        const salt = await bcryptjs.genSalt(10)
        const passwordEncriptado= await bcryptjs.hash(password, salt)
        const newPlayer = await Player.create({
            email, usuario, edad, posicion, ciudad, pierna, descripcion, photoUrl, campeonatos,
            passwordEncriptado, tarifa
        })
        console.log(passwordEncriptado)
        console.log(newPlayer);

        //REDIRECCION DE USUARIO
        res.redirect("login-player")
    }catch(error){
        console.log(error);

        res.status(500).render("signup-player",{
            errorMessage:"Hubo un error con al validez de tus datos. Intenta nuevamente"
        })
    }

}
exports.viewPlayerLogin = async(req,res) => {
    res.render("login-player")
}

exports.playerLogin = async(req, res) =>{

    try{

        //1. OBTENCION DE DATOS DEL FORMULARIO
        const email = req.body.email
        const password = req.body.password

        //2. VALIDACION DE USUARIO ENCONTRADO EN BD
        const foundPlayer = await Player.findOne({email})

        if(!foundPlayer){
            res.render("login-player",{
                errorMessage:"Email o contrasena sin coincidencia."
            })
            return
        }

        //3. VALIDACION DE CONTRASENA
        //COMPARAR LA CONTRASENA DEL FORUMULARIO(1) VS LA CONTRASENA DE LA BD (2)
        const verifiedPass = await bcryptjs.compareSync(password,foundPlayer.passwordEncriptado)
        
        if(!verifiedPass){
            res.render("login-player",{
                errorMessage: "Email o contrasena erronea. Intenta nuevamente."
            })
            return
        }
        //4. GENERAR LA SESION
        //PERSISTENCIA DE IDENTIDAD
        // req.session.currentPlayer = {
        //     _id: foundPlayer._id,
        //     email: foundPlayer.email,
        //     mensaje:"LO LOGRAMOS"
        // }
        res.redirect("/players/player-profile")
    }catch(error){
        console.log(error)
    }


}

exports.profile = async (req,res) => {
    res.render("players/player-profile")
}

exports.viewPlayerList = async (req, res) => {
    const allPlayers = await Player.find({})
    res.render("players/list", {
        players: allPlayers
    })
}