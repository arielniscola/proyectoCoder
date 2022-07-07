import { Router } from 'express';
const app = Router();
import productos_routes from './productos.js';
import carrito_routes from './carrito.js';

app.use('/productos', productos_routes);
app.use('/carrito', carrito_routes);


app.use('/*', (req, res) => {
    res.status(404).json({err: -2, descripcion: `Ruta ${req.baseUrl} y método ${req.method} no implementados`})
})


export default app;