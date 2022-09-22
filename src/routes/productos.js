import { Router } from 'express';
const api = Router();
import adminMiddleware from '../middlewares/admin.js';
import productosControllers from '../controllers/producto.js';


api.get('',productosControllers.getProductos);
api.get('/:id', productosControllers.getProductoID);
api.post('', productosControllers.addProducto);
api.put('/:id', productosControllers.updateProducto);
api.delete('/:id', productosControllers.deleteProducto);

export default api;