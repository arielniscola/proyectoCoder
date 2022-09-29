import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import path from 'path'
import rutas from './src/routes/index.js';
const PORT = process.env.PORT || 8080;
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import passportLoginSetup from './src/utils/passport-login.js'
import yargs from 'yargs'
import {hideBin} from "yargs/helpers";
import cluster from 'cluster'
import os from 'os'
import { logger } from './src/utils/logger.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('uploads'))



passportLoginSetup(passport);

//configuracion del motor de plantilla
app.engine('hbs', engine ({
    extname: 'hbs',
    defaultLayout: path.join(__dirname, './public/views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, './public/views/layouts')
}))

app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, './public')))

//configuracion de las sesiones
app.use(cookieParser())
    app.use(
        session({
            secret: "pasapalabra",
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 100000
            },
            rolling: true,
            resave: false,
            saveUninitialized: false
        }),
    );
//configuracion de passport
app.use(passport.initialize())
app.use(passport.session()) 

app.use('/api', rutas);


const args = yargs(hideBin(process.argv))
  .alias({ p: 'port'})
  .default({ port: 8080}).argv;

//config cluster
const isCluster = process.argv[3] == "cluster"
const cpus = os.cpus()

if(isCluster && cluster.isPrimary){
    cpus.map(() => {
        cluster.fork()
    })
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        logger.info('info' , "trabajando en modo cluster")
        cluster.fork()
    })
}else {
    app.listen(PORT,  () => {
        logger.info('info' , "base de datos conectada correctamente")
        console.log(`App listening on PORT :${PORT} modo de almacenamiento: ${process.env.DATABASE}`);
    });  
}

