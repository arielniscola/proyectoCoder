import daos from '../daos/index.js'

const createCarrito = ((req, res) => {    
    let carrito ={
        timestamp: Date.now(),
        productos:  []
    }
    daos.carritoDao.save(carrito).then(created => {
        res.status(201).send({message: `Carrito creado`})
    }).catch(err=> res.status(500).send({message: `Error en el servidor: ${err}`}))
})

const deleteCarrito = ((req, res) => {
    const id = req.params.id;

    daos.carritoDao.delete(id).then(deleted => {
        if(deleted) res.status(200).send({message: `Carrito ID: ${id} eliminado`})
        if(!deleted) res.status(404).send({message: `No se encontro carrido ID: ${id}`})
    }).catch(err => {
        res.status(500).send({message: `Error en el servidor ${err}`})
    })
})

const getProductosCarrito = ( async (req, res) => {
    const idCar = req.params.id;
    let carrito = await daos.carritoDao.get(idCar);
    let productos = [];
    
    for(let i=0; i < carrito.productos.length; i++){
        let prod = await daos.productoDao.get(carrito.productos[i]);
       productos.push(prod);
    }
    res.status(200).json(productos)
})

const addProductoCarrito = (async (req, res) => {
    const carritoId = req.params.id;
    const idProductos = req.body.id; 
    
    let producto;
    let carritoUpdate;
    //busco el producto por id
    await daos.productoDao.get(idProductos)
    .then(result => { producto = result})
    .catch(err=>{console.log(err)});
    //busco el carrito completo
    await daos.carritoDao.get(carritoId)
    .then(result => { carritoUpdate = result})
    .catch(err=>{console.log(err)});
    carritoUpdate.productos.push(producto._id || idProductos)
    
    console.log(carritoUpdate);
    //actualizo carrito
    daos.carritoDao.update(carritoUpdate, carritoId).then(updated => {
        if(updated) res.status(200).json({message: 'Productos agregados correctamente'})
        if(!updated) res.status(404).json({message: 'Productos no agregados'})
    }).catch(err => res.status(500).json({message: `Error en el servidor: ${err}`}))
})

const deleteProductoCarrito = (async (req, res) => {
    const idCar = req.params.id;
    const idProd = req.params.id_prod;
    let carrito;
    await daos.carritoDao.get(idCar)
    .then(result => { carrito = result})
    .catch(err=>{console.log(err)});

   for(let i= 0; i < carrito.productos.length; i++){
    if(carrito.productos[i] == idProd){
        carrito.productos.splice(i, 1);
    }
   }
    //actualizo carrito
    daos.carritoDao.update(carrito, idCar).then(updated => {
        if(updated) res.status(200).json({message: 'Producto eliminado correctamente'})
        if(!updated) res.status(404).json({message: 'Producto no eliminado'})
    }).catch(err => res.status(500).json({message: `Error en el servidor: ${err}`}))
})

export default {
    createCarrito,
    deleteCarrito,
    getProductosCarrito,
    addProductoCarrito,
    deleteProductoCarrito
}