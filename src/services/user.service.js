import daos from "../daos/index.js";


const addUser = async ({nombre, email, edad, foto, telefono, direccion, password}) =>{
 
    edad = parseInt(edad);

    if (typeof nombre !== "string") throw "El Nombre del usuario debe ser un string";

    if (typeof edad !== "number") throw "La edad debe ser un numero";

    //if(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(email)) throw "Email ingresado inválido"

    //encriptar password
    
    const data = await daos.userDao.save({nombre, email, edad, foto, telefono, direccion, password});

    return data
}

const getUserID = async (id) => {
    const data  = await daos.userDao.get(id);
    
    return data
}

const deleteUser = async (id) => {
    const data = await daos.userDao.delete(id);

    return data
}

const getUserMail = async(email) => {
    const data = await daos.userDao.getUserMail(email);

    return data
}

const updateUser = async ({nombre, email, edad, foto, telefono, direccion, password}, id) => {
    edad = parseInt(edad);

    if (typeof nombre !== "String") throw "El Nombre del usuario debe ser un string";

    if (typeof edad !== "number") throw "La edad debe ser un numero";

    //if(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(email)) throw "Email ingresado inválido"

    
    const data = await daos.userDao.update({nombre, email, edad, foto, telefono, direccion, password}, id);


    return data
}
const getAllusers = async () => {

    const data = await daos.userDao.getAll();

    return data
}

export const userService = {
    addUser,
    getUserID,
    deleteUser,
    getUserMail,
    updateUser,
    getAllusers
}