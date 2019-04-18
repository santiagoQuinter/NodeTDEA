const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//Creamos un Schema
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required:true
    },
    descripcion:{   
        type: String,
        required:true
    },
    modalidad:{
        type:String,
        enum:{values:['virtual', 'presencial']}
    },
    intensidadHoraria:{
        type:Number
    },
    estado:{
        type:String,
        default: 'disponible'
    }
});
cursoSchema.plugin(uniqueValidator,{message: 'Error, Ya existe un curso con el mismo id' });

//Crear un modelo que va a utilizar ese Schema
const Curso = mongoose.model('Curso',cursoSchema);

//Exportar el modelo para poderlo utilizar
module.exports = Curso