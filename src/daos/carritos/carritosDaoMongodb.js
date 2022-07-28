import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class CarritoDaoMongodb extends ContenedorMongo {
    constructor(){
        super('Carrito', {          
            timestamp: { type: Date, default: Date.now()},
            productos: { type: Array, default: [] }
        })
    }
}

export default CarritoDaoMongodb