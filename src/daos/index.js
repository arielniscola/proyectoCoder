import dotenv from 'dotenv';
dotenv.config();

let productoDao
let carritoDao
let userDao

switch (process.env.DATABASE) {
    case 'mongo':
        const { default: ProductoDaoMongodb } = await import("./productos/productosDaoMongodb.js")
        const { default: CarritoDaoMongodb } = await import("./carritos/carritosDaoMongodb.js")
        const { default:  UserDaoMongodb } = await import("./users/usersDaoMongodb.js")

        productoDao = new ProductoDaoMongodb()
        carritoDao = new CarritoDaoMongodb()
        userDao = new UserDaoMongodb()

        break;
    case 'firebase':
        const { default: ProductoDaoFirebase } = await import("./productos/productosDaoFirebase.js")
        const { default: CarritoDaoFirebase } = await import("./carritos/carritosDaoFirebase.js")

        productoDao = new ProductoDaoFirebase()
        carritoDao = new CarritoDaoFirebase()

        break;
}

export default { carritoDao, productoDao, userDao}