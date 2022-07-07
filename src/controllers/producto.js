import Producto from '../models/producto.js';
const producto = new Producto();


const getProductos = ((req, res) => {
    producto.getAll().then((prods) => {
        if(prods.length == 0) res.status(404).send({message: "No se encontraron productos"})
        res.status(200).json(prods)
    }).catch(err => res.status(500).send({message: "Error en el servidor"}))
})

const getProductoID = ((req, res) => {
    const id = req.params.id;

    producto.getProducto(id).then((prod) => {
        if(prod.length == 0) res.status(404).send({message: `No se encontro producto con ID: ${id}`})
        res.status(200).json(prod)
    }).catch(err => {
        res.status(500).send({message: "Error en el servidor buscando productos"})
    })
})

const addProducto = ((req, res) => {
    const { nombre, descripcion, codigo, foto, stock, precio } = req.body;

    producto.codigo = codigo;
    producto.descripcion = descripcion;
    producto.nombre = nombre;
    producto.foto = foto;
    producto.stock = stock;
    producto.precio = precio;

    producto.guardarProducto(producto).then((idProducto) =>{
        res.status(201).send({message: `Producto creado con ID: ${idProducto}`})
    }).catch(err =>res.status(500).send({message: `Error en el servidor: ${err}`}))

})


const updateProducto = ((req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, codigo, foto, stock, precio} = req.body;
    const prod = new Producto();
    prod.codigo = codigo;
    prod.descripcion = descripcion;
    prod.nombre = nombre;
    prod.foto = foto;
    prod.stock = stock;
    prod.precio = precio;

    producto.updateProducto(prod, id).then((updated) => {
        if(updated) res.status(201).send({message: `Se actualizo el producto con ID: ${id}`})

        if(!updated)res.status(404).send({message:"No se encontro producto con ID especificado"})

    }).catch(err => res.status(500).send({message: 'Error en el servidor'}))
})

const deleteProducto = ((req, res) => {
    const id = req.params.id;

    producto.deleteProducto(id).then(deleted => {
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