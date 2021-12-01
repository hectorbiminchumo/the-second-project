

//AREAS PRIVADAS - EL USUARIO DEBE ESTAR LOGGEADO PARA ACCEDER
const usuarioLoggeado = (req, res,next) => {
    console.log(req.session);

//EVALUAR SI EL USUARIO NO ESTA LOGGEADO
// SI NO ESTA LOGGEADO ENVIARLO A LOGIN...
if(!req.session.currentUser){
    res.redirect("login")
    return
}
//SI SI ESTA LOGGEADO ENVIARLO A LA SIGUIENTE FUNCION (CONTROLLER)

next()

}

//AREAS DE AUTENTIFICACION 0 EL USUARIO YA SE AUTENTICO Y QUIERE ENTRAR A LAS ARES DE SIGNUP Y LOGIN. POR LO TANTO LO REDIRIGIMOS AL HOME

const usuarioNoLoggeado = (req, res, next) => {
    //EVALUAR SI ESTA AUTENTICADO
    // SI SI ESTA AUTENTICADO...
    if(req.session.currentUser){
        return res.redirect("/")

    }
    //SI NO ESTA AUTENTICADO, DEJALO PASAR AL SIGNUP O LOGIN
    next()


}

module.exports = {
    usuarioLoggeado,
    usuarioNoLoggeado
}