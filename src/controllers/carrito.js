
import { carritoService } from '../services/carrito.service.js'


const createCarrito = ((req, res) => {    
    let carrito ={
        timestamp: Date.now(),
        productos:  []
    }
    carritoService.createCarrito(carrito).then(created => {
        res.status(201).send({message: `Carrito creado`})
    }).catch(err=> res.status(500).send({message: `Error en el servidor: ${err}`}))
})

const deleteCarrito = ((req, res) => {
    const id = req.params.id;

    carritoService.deleteCarrito(id).then(deleted => {
        if(deleted) res.status(200).send({message: `Carrito ID: ${id} eliminado`})
        if(!deleted) res.status(404).send({message: `No se encontro carrido ID: ${id}`})
    }).catch(err => {
        res.status(500).send({message: `Error en el servidor ${err}`})
    })
})

const getProductosCarrito = ( async (req, res) => {   
    try {
        const idCar = req.params.id;
        let result = await carritoService.getProductosCarrito(idCar);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({error: error})
    }
   
  
})

const addProductoCarrito = (async (req, res) => {
    const carritoId = req.params.id;
    const idProductos = req.body.id; 
    

    carritoService.addProductoCarrito(idProductos, carritoId).then(updated => {
        if(updated) res.status(200).json({message: 'Productos agregados correctamente'})
        if(!updated) res.status(404).json({message: 'Productos no agregados'})
    }).catch(err => res.status(500).json({message: `Error en el servidor: ${err}`}))
})

const deleteProductoCarrito = (async (req, res) => {
    const idCar = req.params.id;
    const idProd = req.params.id_prod;
  
   
    //actualizo carrito
    carritoService.deleteProductoCarrito(idProd, idCar).then(updated => {
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