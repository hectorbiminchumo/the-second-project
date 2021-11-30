//indexController
const User = require("./../models/User")
const bcryptjs = require("bcryptjs")

exports.home = async (req, res) =>{

    res.render("home")


}

//muestra los botones para crear cuenta como usuario o jugador
exports.signOption = async(req,res)=>{

    res.render("sign-option")


}




exports.catalogo = async (req, res) =>{

    res.render("catalogo")


}

//muestra formulario
exports.viewUserRegister = async (req, res) =>{
    res.render("signup-user")
}


//Se envían los datos a BD
exports.userRegister = async (req,res) =>{
    //Obtencion de datos
    const email = req.body.email
    const usuario = req.body.usuario
    const password = req.body.password

    //Validacion
    if(!email || !password || !usuario){
        res.render("signup-user", {
            errorMessage: "Ingresar correctamente las credenciales"
        })
        return
    }

    //password

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if(!regex.test(password)){
        res.render("signup-user", {
            errorMessage:"Tu password debe contener 6 caracteres, minimo un numero y una mayuscula."
        })
        return
    }

    try{
        //encriptacion del password
    const salt = await bcryptjs.genSalt(10)
    const passwordEncriptado = await bcryptjs.hash(password, salt)
    const newUser = await User.create({
        email, usuario, passwordEncriptado
    })
    console.log(newUser);
    //Redireccion a login
    res.redirect("/")
    }catch (error){
        console.log(error);
        res.status(500).render("signup-user", {
            errorMessage: "Hubo un error"
        })
    }
}




//muestra formulario de login
    exports.viewUserLogin = async(req,res) => {
        res.render("login-user")
    }
// se envían los datos a BD
    exports.userLogin = async (req,res) => {
        try{
            const email = req.body.email
            const password = req.body.password

            const foundUser = await User.findOne({email})
            if(!foundUser){
                res.render("login-user", {
                    errorMessage: "Ingrese los datos correctamente"
                })
                return
            }
            const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado)
            if(!verifiedPass){
                res.render("login-user", {
                    errorMessage: "Email o password erroneos"
                })
                return
            }
            req.session.currentUser = {
                _id: foundUser._id,
                email: foundUser.email,
            }
            res.redirect("/")
        }catch(error){
            console.log(error)
        }


    }

    exports.logout = async (req, res) => {
        req.session.destroy((error) => {
            if(error){
                console.log(error);
                return
            }
            res.redirect("/")

        })
    }