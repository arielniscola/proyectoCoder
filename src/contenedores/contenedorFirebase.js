import config from '../config.js';
import admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase{
    constructor(nombreColeccion){
        this.coleccion = db.collection(nombreColeccion);
    }

    async get(id){
        try {
            const document = this.coleccion.doc(id)
            const responseDoc = await document.get()
            const response = responseDoc.data();
    
            return response
        } catch (error) {
            return error
        }

    }

    async getAll(){
        try {
           const coleccionesSnapshot = await this.coleccion.get()
           const colecciones = coleccionesSnapshot.docs;
           const response = colecciones.map(coleccion =>(
            coleccion.data()
           ))
           return response
        } catch (error) {
            
        }
    }
    
    async save(data){
        try {
            const collection = this.coleccion.doc();
            const result = await collection.create(data);
            return true
        } catch (error) {
            return error
        }
    }

    async update(dataUpdate, id){
        try {
            const document = this.coleccion.doc(id);
            const documentUpdated = await document.update(dataUpdate);
        
            return id
        } catch (error) {
            return error
        }
 
        
    }

    async delete(id){
        try {
            const doc = this.coleccion.doc(id)
            const docDeleted = await doc.delete()
            return docDeleted
        } catch (error) {
            return error
        }
    }
}

export default ContenedorFirebase