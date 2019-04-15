const mongoose = require('mongoose');
//Creamos un Schema
const Schema = mongoose.Schema;

const cursoxusuarioSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    cedula:{
        type: Number,
        required: true
    }
});

//Crear un modelo que va a utilizar ese Schema
const Cursoxusuario = mongoose.model('Cursoxusuario',cursoxusuarioSchema);

//Exportar el modelo para poderlo utilizar
module.exports = Cursoxusuario