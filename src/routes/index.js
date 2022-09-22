import { Router } from 'express';
const app = Router();
import productos_routes from './productos.js';
import carrito_routes from './carrito.js';
import users_routes from './users.js';



app.use('/productos', productos_routes);
app.use('/carrito', carrito_routes);
app.use('/', users_routes);

//rutas de vistas
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/error-page', (req, res) => {
    res.render('register-error-page');
})
app.use('/*', (req, res) => {
    res.status(404).json({err: -2, descripcion: `Ruta ${req.baseUrl} y método ${req.method} no implementados`})
})


export default app;