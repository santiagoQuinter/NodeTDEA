const mongoose = require('mongoose');
//Creamos un Schema
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    id:{
        type: Number,
        required: true
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

//Crear un modelo que va a utilizar ese Schema
const Curso = mongoose.model('Curso',cursoSchema);

//Exportar el modelo para poderlo utilizar
module.exports = Curso