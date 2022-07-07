import Carrito from '../models/carrito.js';
import Producto from '../models/producto.js';
const carro = new Carrito();
const producto = new Producto();

const createCarrito = ((req, res) => {
    const {productos} = req.body;
    const carrito = new Carrito(productos);
    carrito.saveCarrito(carrito).then(id => {
        res.status(201).send({message: `Carrito creado ID: ${id}`})
    }).catch(err=> res.status(500).send({message: `Error en el servidor: ${err}`}))
    
})

const deleteCarrito = ((req, res) => {
    const id = req.params.id;

    carro.deleteCarrito(id).then(deleted => {
        if(deleted) res.status(200).send({message: `Carrito ID: ${id} eliminado`})
        if(!deleted) res.status(404).send({message: `No se encontro carrido ID: ${id}`})
    }).catch(err => {
        res.status(500).send({message: `Error en el servidor ${err}`})
    })
})

const getProductosCarrito = ((req, res) => {
    const idCar = req.params.id;

    carro.getProductos(idCar).then((productos) => {
        res.status(200).json({productos});
    }).catch(err=> { res.status(500).send({message: `Error en el servidor: ${err}`})})

})

const addProductoCarrito = (async (req, res) => {
    const carritoId = req.params.id;
    const idsProductos = req.body; //obtengo los id de los productos por body. Arreglo de ID
    let productoArray = [];
    //busco los productos por ID
    await producto.getProductosID(idsProductos.id)
    .then(result => { productoArray = result})
    .catch(err=>{console.log(err)});
    //agrego los productos al carrito
    carro.addProducto(carritoId, productoArray).then(added => {
        if(added) res.status(200).json({message: 'Productos agregados correctamente'})
        if(!added) res.status(404).json({message: 'Productos no agregados'})
    }).catch(err => res.status(500).json({message: `Error en el servidor: ${err}`}))
})

const deleteProductoCarrito = ((req, res) => {
    const idCar = req.params.id;
    const idProd = req.params.id_prod;

    carro.deleteProducto(idCar, idProd).then(deleted => {
        if(deleted) res.status(200).json({message: 'Producto eliminado'})
    }).catch(err => {
        res.status(500).json({message: `Error en el servidor: ${err}` })
    })
})

export default {
    createCarrito,
    deleteCarrito,
    getProductosCarrito,
    addProductoCarrito,
    deleteProductoCarrito
}