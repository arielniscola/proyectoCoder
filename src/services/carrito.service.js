import daos from "../daos/index.js";

const createCarrito = async () => {
    let carrito = {
        timestamp: Date.now(),
        productos: []
    }
   const data = await daos.carritoDao.save(carrito);

   return data
}

const deleteCarrito = async (id) => {
   const data = await daos.carritoDao.delete(id);

   return data
}

const getProductosCarrito = async (id) => {
    const data = await daos.carritoDao.get(id);

    let productos = [];
    
    for(let i=0; i < data.productos.length; i++){
        let prod = await daos.productoDao.get(data.productos[i]);
       productos.push(prod);
    }

    return productos
}

const addProductoCarrito = async (idProd, idCar) => {
    const carrito = await daos.carritoDao.get(idCar);
    const producto = await daos.productoDao.get(idProd);

    if(!carrito || !producto) throw "No existen producto o carrito especificado"

    const carritoUpdate = await daos.carritoDao.update(carrito, carrito._id);

    return carritoUpdate
}

const deleteProductoCarrito = async (idProd, idCar) => { 
    const carrito = await daos.carritoDao.get(idCar);
    const producto = await daos.productoDao.get(idProd);

    if(!carrito || !producto) throw "No existen producto o carrito especificado"

    for(let i= 0; i < carrito.productos.length; i++){
        if(carrito.productos[i] == idProd){
            carrito.productos.splice(i, 1);
        }
    }
    const carritoUpdate = await daos.carritoDao.update(carrito, carrito._id);

    return carritoUpdate
}

export const carritoService = {
    createCarrito,
    deleteCarrito,
    getProductosCarrito,
    addProductoCarrito,
    deleteProductoCarrito
}