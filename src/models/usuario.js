const mongoose = require('mongoose');
//Creamos un Schema
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    cedula:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    correo: {
        type: String,
        required:true
    },
    telefono:{
        type: String,
        required:true
    },
    rol:{
        type:String,
        default: 'aspirante'
    }
});

//Crear un modelo que va a utilizar ese Schema
const Usuario = mongoose.model('usuario',usuarioSchema);

//Exportar el modelo para poderlo utilizar
module.exports = Usuario
