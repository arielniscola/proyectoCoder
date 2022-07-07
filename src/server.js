import config from './config.js';
import express from 'express';
const app = express();
import rutas from './routes/index.js';

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api', rutas);

app.listen(config.PORT,  () => {
    console.log(`App listening on PORT :${config.PORT}`);
});