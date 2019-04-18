const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//Creamos un Schema
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    cedula:{
        type: Number,
        required: true,
        unique: true,
        trim: true
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
    },
    contraseña:{
        type:String,
        required:true,
        trim: true
    }
});
usuarioSchema.plugin(uniqueValidator,{message: 'Error, Ya existe un usuario con la misma cedula' });

//Crear un modelo que va a utilizar ese Schema
const Usuario = mongoose.model('usuario',usuarioSchema);

//Exportar el modelo para poderlo utilizar
module.exports = Usuario
