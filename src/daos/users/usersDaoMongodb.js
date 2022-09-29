import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class UserDaoMongodb extends ContenedorMongo{
    constructor(){
        super("User", {
            nombre:{ type: String},
            email:{ type: String, unique: true},
            edad: { type: Number },
            foto: { type: String },
            telefono: {type: String},
            direccion: { type: String },
            password: { type: String }
        })
    }

    async getUserMail(email){
        try {
            const user = await this.coleccion.findOne(email)
            return user
        } catch (error) {
            return error
        }

    }
}

export default UserDaoMongodb