import { Router } from 'express';
const api = Router();
import carritoControllers from '../controllers/carrito.js';


api.get('/:id/productos', carritoControllers.getProductosCarrito);
api.post('/:id/productos', carritoControllers.addProductoCarrito );
api.post('', carritoControllers.createCarrito);
api.delete('/:id', carritoControllers.deleteCarrito);
api.delete('/:id/productos/:id_prod', carritoControllers.deleteProductoCarrito);

export default api