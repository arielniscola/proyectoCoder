let admin = true;

let userAdmin = ((req, res, next) => {
    if(admin) {
        next();
    }else{
        res.status(401).send({err: -2, descripcion: `Ruta ${req.baseUrl} y método ${req.method} no autorizados`})
    }
})


export default userAdmin;