import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class ProductoDaoMongodb extends ContenedorMongo{
    constructor(){
        super("Producto", {
            nombre:{ type: String},
            precio:{ type: Number},
            descripcion: { type: String },
            foto: { type: String },
            timestamp: { type: Date, default: Date.now()},
            stock: {type: Number},
            codigo: { type: String }
        })
    }
}

export default ProductoDaoMongodb