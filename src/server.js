import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import rutas from './routes/index.js';
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api', rutas);


app.listen(PORT,  () => {
    console.log(`App listening on PORT :${PORT} modo de almacenamiento: ${process.env.DATABASE}`);
});
