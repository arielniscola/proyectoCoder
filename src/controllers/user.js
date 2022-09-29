import { userService } from '../services/user.service.js';
import logger from '../utils/logger.js';
import multer from 'multer';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const getUsers = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    userService.getAll().then((prods) => {
        if(prods.length === 0) res.status(404).send({message: "No se encontraron productos"})
        if(prods.length > 0) res.status(200).json(prods)
    }).catch(err => res.status(500).send({message: err}))
})

const getUserID = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const id = req.params.id;
    userService.getUserID(id).then((prod) => {
        if(prod.length == 0) res.status(404).send({message: `No se encontro producto con ID: ${id}`})
        res.status(200).json(prod)
    }).catch(err => {
        res.status(500).send({message: err})
    })
})

const addUser = ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const { nombre, email, edad, foto, direccion, password } = req.body;
    let user = {
        nombre, email, edad, foto, direccion, password
    }
    
    userService.addUser(user).then((user) =>{
        res.status(201).send({message: `Usuario creado: ${user}`})
    }).catch(err =>res.status(500).send({message: `Error en el servidor: ${err}`}))

})


const deleteUser= ((req, res) => {
    logger.info('info' , `accede a: ${req.url}`)
    const id = req.params.id;

    userService.deleteUser(id).then(deleted => {
        if(deleted) res.status(200).send({message: `Objeto con ID: ${id} ha sido eliminado`});
        if(!deleted) res.status(404).send({message: `Objeto con ID: ${id} no se encontro`});
    }).catch(err => {
        res.status(500).send({message: `Error en el servidor: ${err}`})
    }) 
})

const getUserEmail = ((email) => {
    logger.info('info' , `accede a: ${req.url}`)
    userService.getUserMail(email).then((prod) => {
        if(prod.length == 0) return false
        return prod
    }).catch(err => {
       return err
    })
})

export default{
  addUser,
  deleteUser,
  getUserID,
  getUsers,
  getUserEmail
}