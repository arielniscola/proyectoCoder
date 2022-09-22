import daos from '../daos/index.js';

const getUsers = ((req, res) => {
    daos.productoDao.getAll().then((prods) => {
        if(prods.length === 0) res.status(404).send({message: "No se encontraron productos"})
        if(prods.length > 0) res.status(200).json(prods)
    }).catch(err => res.status(500).send({message: "Error en el servidor"}))
})

const getUserID = ((req, res) => {
    const id = req.params.id;
    daos.userDao.get(id).then((prod) => {
        if(prod.length == 0) res.status(404).send({message: `No se encontro producto con ID: ${id}`})
        res.status(200).json(prod)
    }).catch(err => {
        res.status(500).send({message: "Error en el servidor buscando productos"})
    })
})

const addUser = ((req, res) => {
    const { nombre, email, edad, foto, direccion, password } = req.body;
    let user = {
        nombre, email, edad, foto, direccion, password
    }
    
    daos.userDao.save(user).then((user) =>{
        res.status(201).send({message: `Usuario creado: ${user}`})
    }).catch(err =>res.status(500).send({message: `Error en el servidor: ${err}`}))

})


const deleteUser= ((req, res) => {
    const id = req.params.id;

    daos.userDao.delete(id).then(deleted => {
        if(deleted) res.status(200).send({message: `Objeto con ID: ${id} ha sido eliminado`});
        if(!deleted) res.status(404).send({message: `Objeto con ID: ${id} no se encontro`});
    }).catch(err => {
        res.status(500).send({message: `Error en el servidor: ${err}`})
    }) 
})

const getUserEmail = ((email) => {
    daos.userDao.getByProperty(email).then((prod) => {
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