const User = require("./../models/User")
const bcryptjs = require("bcryptjs")

exports.home = async (req, res) =>{

    res.render("home")


}

exports.signOption = async(req,res)=>{

    res.render("sign-option")


}




exports.catalogo = async (req, res) =>{

    res.render("catalogo")


}



exports.register = async (req,res) =>{
    //Obtencion de datos
    const email = req.body.email
    const password = req.body.password

    //Validacion
    if(!email || !password){
        res.render("signup", {
            errorMessage: "Ingresar correctamente el correo y contrasena"
        })
        return
    }

    //password

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    if(!regex.test(password)){
        res.render("signup", {
            errorMessage:"Tu password debe contener 6 caracteres, minimo un numero y una mayuscula."
        })
        return
    }

    try{
        //encriptacion del password
    const salt = await bcryptjs.genSalt(10)
    const passwordEncriptado = await bcryptjs.hash(password, salt)
    const newUser = await User.create({
        email, passwordEncriptado
    })
    console.log(newUser);
    //Redireccion a login
    res.redirect("/login")
    }catch (error){
        console.log(error);
        res.status(500).render("signup", {
            errorMessage: "Hubo un error"
        })
    }
}

    exports.viewLogin = async(req,res) => {
        res.render("login")
    }

    exports.login = async (req,res) => {
        try{
            const email = req.body.email
            const password = req.body.password

            const foundUser = await User.findOne({email})
            if(!foundUser){
                res.render("login", {
                    errorMessage: "Ingrese los datos correctamente"
                })
                return
            }
            const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado)
            if(!verifiedPass){
                res.render("login", {
                    errorMessage: "Email o password erroneos"
                })
                return
            }
            req.session.currentUser = {
                _id: foundUser._id,
                email: foundUser.email,
            }
            res.redirect("/users/profile")
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