import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('producto')
    }

}

export default ProductosDaoFirebase