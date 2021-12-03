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

//muestra formulario para crear cuenta de usuario
exports.viewUserRegister = async (req, res) =>{
    res.render("signup-user")
}


//Se envían los datos a BD de usuarios para registar cuenta
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
    res.redirect("/login-user")
    }catch (error){
        console.log(error);
        res.status(500).render("signup-user", {
            errorMessage: "Hubo un error"
        })
    }
}

//muesta los botones para loggearse como usuario o jugador
exports.loginOption = async(req, res) =>{
    res.render("login-option")
}


//muestra formulario de login
    exports.viewUserLogin = async(req,res) => {
        res.render("login-user")
    }

//perfil único de usuario
exports.viewProfile = async (req,res) => {
    const singleUserID = req.params.userID
    const getTheUser = await User.findById(singleUserID)
    res.render("users/profile", {
        user: getTheUser
    })
        
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
            usuario: foundUser.usuario,
            email: foundUser.email,
        }
        res.redirect(`/users/profile/${foundUser._id}`)
    }catch(error){
        console.log(error)
    }


}

   //edición del perfil

//Muestra el formulario de edición
exports.viewEditUser = async(req, res)=>{
    console.log(req.params)
    const userID = req.params.userID

    const foundUser = await User.findById(userID)
    res.render("users/update-user",{
        user:foundUser
    })
}

//Edita el usuario

exports.editUser = async(req, res) =>{

        //ID del user
    const userID = req.params.userID

        //Los nuevos cambios del formulario
    const usuario = req.body.usuario
    const email = req.body.email

    console.log(userID);
    console.log(usuario, email)

        //realizar la actualización en la baase de datos
    const updatedUser = await User.findByIdAndUpdate(userID, {usuario, email},
        {new:true})

        console.log(updatedUser);
        res.redirect(`/users/profile/${updatedUser._id}`)
}


//Delete user
exports.deleteUser = async (req, res) => {

    //1. IDENTIFICAR EL USUARIO QUE QUIERO BORRAR
    const userID = req.params.userID

    //2. REALIZAMOS BORRADO EN BD
    const deletedUser = await User.findByIdAndDelete(userID)

    console.log(userID);
    console.log("User deleted", deletedUser);

    //3. REDIRECCION
    req.session.destroy((error) => {
        if(error){
            console.log(error);
            return
        }
        res.redirect("/")

    })


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

    




   


 



   