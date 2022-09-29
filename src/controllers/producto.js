import { productoService } from '../services/producto.service.js';

const getProductos = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    productoService.getAllProducts().then((prods) => {
        if(prods.length === 0) res.status(404).send({message: "No se encontraron productos"})
        if(prods.length > 0) res.status(200).json(prods)
    }).catch(err => res.status(500).send({message: "Error en el servidor"}))
})

const getProductoID = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const id = req.params.id;
    productoService.getProductoID(id).then((prod) => {
        if(prod.length == 0) res.status(404).send({message: `No se encontro producto con ID: ${id}`})
        res.status(200).json(prod)
    }).catch(err => {
        res.status(500).send({message: "Error en el servidor buscando productos"})
    })
})

const addProducto = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const { nombre, descripcion, codigo, foto, stock, precio } = req.body;
    let producto = {
        nombre, descripcion, codigo, foto, stock, precio
    }
    producto.timestamp = Date.now();

    productoService.addProducto(producto).then((idProducto) =>{
        res.status(201).send({message: `Producto creado con ID: ${idProducto}`})
    }).catch(err =>res.status(500).send({message: `Error en el servidor: ${err}`}))

})


const updateProducto = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const id = req.params.id;
    const { nombre, descripcion, codigo, foto, stock, precio} = req.body;
    
    const producto  = {
    nombre, descripcion, codigo, foto, stock, precio
   }

    productoService.updateProducto(producto, id).then((updated) => {
        if(updated) res.status(201).send({message: `Se actualizo el producto con ID: ${id}`})

        if(!updated)res.status(404).send({message:"No se encontro producto con ID especificado"})

    }).catch(err => res.status(500).send({message: err}))
})

const deleteProducto = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const id = req.params.id;

    productoService.deleteProducto(id).then(deleted => {
        if(deleted) res.status(200).send({message: `Objeto con ID: ${id} ha sido eliminado`});
        if(!deleted) res.status(404).send({message: `Objeto con ID: ${id} no se encontro`});
    }).catch(err => {
        res.status(500).send({message: `Error en el servidor: ${err}`})
    }) 
})


export default{
    addProducto,
    getProductos,
    getProductoID,
    updateProducto,
    deleteProducto
}