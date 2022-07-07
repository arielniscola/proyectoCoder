import fs from 'fs';

class Producto{

    constructor(nombre = null, descripcion = null, codigo = null, foto = null, precio = null, stock = null){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.timestamp = Date.now();
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }

    async guardarProducto(obj){
            try {
                let contenido = await this.getAll();   
                //convertir a json contenido del archivo
                let idCount = 0;
                //obtener el id del ultimo elemento y asigno el consecutivo
                if(contenido.length > 0){
                    idCount = contenido[contenido.length -1].id;              
                }
                obj.id = idCount + 1;
                contenido.push(obj);
                contenido = JSON.stringify(contenido, null,'\t'); //formatear string
                //reescribo arhivo actualizado
                await fs.promises.writeFile(`./src/archivos/producto.txt`, contenido);
                return obj.id;
            }
            catch (err){
                return err;
            };
    }
    async getProducto(id){
        try {
            let objetos = await this.getAll();
      //busco en el array el objeto con ID igual al proporcionado  
            for(let i=0; i < objetos.length; i++){              
                if(objetos[i].id == id){
                    return objetos[i]
                }else if( i == objetos.length -1){
                     return null
                }
            }         
         } catch (error) {
             return error
         }   
    }  
    async getAll(){
        try {
            const contenido = await fs.promises.readFile(`./src/archivos/producto.txt`, 'utf-8');
            return JSON.parse(contenido); 
        } catch (err) {
            return err;
        }
    }
    async updateProducto(prod, id){
        try {
            let productos = await this.getAll();
            for(let i=0; i < productos.length; i++){              
                if(productos[i].id == id){
                    prod.id = id;
                    productos[i] = prod;
                    productos = JSON.stringify(productos, null,'\t'); //formatear string
                    //reescribo arhivo actualizado
                    await fs.promises.writeFile(`./src/archivos/producto.txt`, productos);
                    return true
                }else if( i == productos.length -1){
                    return false
                }
            } 
        } catch (error) {
            return error
        }          
    }
    async deleteProducto(id){
        try {
            let objetos = await this.getAll();
        
            //buscar el archivo con ID proporcionado, eliminar del array el objeto
            for(let i=0; i < objetos.length; i++){              
                if(objetos[i].id == id){
                   objetos.splice(i, 1);
                   let contenido = JSON.stringify(objetos, null, '\t'); 
                    await fs.promises.writeFile(`./src/archivos/producto.txt`, contenido); //reescribo archivo con objeto eliminado
                    return true
                }else if( i == objetos.length -1){
                    return false
                }
            }
        } catch (error) {
            console.log(`No se borro objeto debido a un error: ${error}`);
        }
    }

     getProductosID(ids){
        return new Promise(async (resolve, reject) => {
            const productos = await this.getAll();
            const arrayprod = [];
            ids.forEach(id => {
                productos.forEach(prod =>{
                    if(prod.id == id){
                        arrayprod.push(prod);
                    }
                })
            });
            resolve(arrayprod)
        });
    }
}

export default  Producto;