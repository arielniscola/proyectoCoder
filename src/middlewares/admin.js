let admin = true;
 

 const userAdmin = ((req, res, next) => {
    if(admin) {
        next();
    }else{
        res.status(401).send({err: -2, descripcion: `Ruta ${req.baseUrl} y método ${req.method} no autorizados`})
    }
});

 const authMiddleware = (req, res, next) =>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirec('/login')
    }
}


export default { userAdmin, authMiddleware }