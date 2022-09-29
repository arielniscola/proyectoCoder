import daos from "../daos/index.js"


const getAllProducts = async () =>{
    const data = await daos.productoDao.getAllProducts()

    return data
}

const getProductoID = async (id) => {
    const data  = await daos.productoDao.get(id);

    return data
}

const addProducto = async ({nombre, descripcion, codigo, foto, stock, precio}) => {
    if (typeof nombre !== "string") throw "El titulo del producto debe ser un string";

     if (typeof precio !== "number") throw "El precio debe ser un numero";

     if (typeof stock !== "number") throw "El stock debe ser un numero";

    const data = daos.productoDao.save({ nombre, descripcion, codigo, foto, stock, precio })

    return data
}

const updateProducto = async ({nombre, descripcion, codigo, foto, stock, precio}, id) => {
    if (typeof nombre !== "string") throw "El titulo del producto debe ser un string";

     if (typeof precio !== "number") throw "El precio debe ser un numero";

     if (typeof stock !== "number") throw "El stock debe ser un numero";

     const data = await daos.productoDao.update({nombre, descripcion, codigo, foto, stock, precio}, id)

     return data
}

const deleteProducto = async (id) => {
    
    const data = await daos.productoDao.delete(id);

    return data
}


export const productoService = {
    getAllProducts,
    getProductoID,
    addProducto,
    updateProducto,
    deleteProducto
}