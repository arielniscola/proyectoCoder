import dotenv from 'dotenv';
dotenv.config();

let productoDao
let carritoDao

switch (process.env.DATABASE) {
    case 'mongo':
        const { default: ProductoDaoMongodb } = await import("./productos/productosDaoMongodb.js")
        const { default: CarritoDaoMongodb } = await import("./carritos/carritosDaoMongodb.js")

        productoDao = new ProductoDaoMongodb()
        carritoDao = new CarritoDaoMongodb()
        break;
    case 'firebase':
        const { default: ProductoDaoFirebase } = await import("./productos/productosDaoFirebase.js")
        const { default: CarritoDaoFirebase } = await import("./carritos/carritosDaoFirebase.js")

        productoDao = new ProductoDaoFirebase()
        carritoDao = new CarritoDaoFirebase()
        break;
}

export default { carritoDao, productoDao}