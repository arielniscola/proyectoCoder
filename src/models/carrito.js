import fs from 'fs'

class Carrito {
    timestamp;
    id;
    productos;

    constructor(productos = []){
        this.timestamp = Date.now();
        this.id = null;
        this.productos = productos;
    }
    async saveCarrito(carrito){
        try {
            let contenido = await this.getAllCarritos();
            let id = await this.generateID();   
            //convertir a json contenido del archivo   
            carrito.id = id;   
            contenido.push(carrito);
            contenido = JSON.stringify(contenido, null,'\t'); //formatear string
            //reescribo arhivo actualizado
            await fs.promises.writeFile(`./src/archivos/carrito.txt`, contenido);
            return carrito.id;
        }
        catch (err){
            return err;
        };
    }
    
    async generateID(){
    let carritos = await this.getAllCarritos();   
        let idCount = 1;
        //obtener el id del ultimo elemento y asigno el consecutivo
         if(carritos.length > 0){
            idCount = carritos[carritos.length -1].id + 1;              
        }
        return idCount
    }
    async addProducto(carritoID, prod){
        try {
            let carritos = await fs.promises.readFile(`./src/archivos/carrito.txt`, 'utf-8');
            carritos = JSON.parse(carritos)
            carritos.forEach(carrito => {               
                if(carrito.id = carritoID){
                    for(let i=0; prod.length > i; i++){
                        carrito.productos.push(prod[i])
                    }                   
                }
            });
            const contenido = JSON.stringify(carritos, null,'\t') //formatear string
            //reescribo arhivo actualizado
            await fs.promises.writeFile(`./src/archivos/carrito.txt`, contenido);
            return true;

        } catch (error) {
            return false
        }
    }
    async deleteProducto(idCar, idProd){
        try {
            const carritos = await this.getAllCarritos();
            for(let i=0; carritos.length > i ;i++){
                if(carritos[i].id == idCar){
                    for(let j=i; carritos[i].productos.length > j; j++){
                        if(carritos[i].productos[j].id = idProd){
                            console.log('ingresa');
                            carritos[i].productos.splice(j, 1);
                            console.log(carritos[i]);
                        }
                        
                      }
                }
               
           
            }
            let contenido = JSON.stringify(carritos, null, '\t'); 
            console.log('se ejecuta antes');
            await fs.promises.writeFile(`./src/archivos/carrito.txt`, contenido); //reescribo archivo con objeto eliminado
            return true
        } catch (error) {
            return error
        }
    }
    async getAllCarritos(){
    try {
        const contenido = await fs.promises.readFile(`./src/archivos/carrito.txt`, 'utf-8');
        return JSON.parse(contenido); 
    } catch (err) {
        return err;
    }
    }
    async getProductos(id){
        try {
            const carritos = await this.getAllCarritos();
            for(let i=0; carritos.length > i ;i++){
                if(carritos[i].id == id){
                    return carritos[i].productos
                  }
            }
            return []
        } catch (error) {
            return error
        }
        
    } 
    async deleteCarrito(id){
        try {
            let objetos = await this.getAllCarritos();
            //buscar el archivo con ID proporcionado, eliminar del array el objeto
            for(let i=0; i < objetos.length; i++){            
                if(objetos[i].id == id){
                   objetos.splice(i, 1);
                   let contenido = JSON.stringify(objetos, null, '\t'); 
                    await fs.promises.writeFile(`./src/archivos/carrito.txt`, contenido); //reescribo archivo con objeto eliminado
                    return true
                }else if( i == objetos.length -1){
                    return false
                }
            }
        } catch (error) {
           return error
        }
    }
}
export default Carrito;