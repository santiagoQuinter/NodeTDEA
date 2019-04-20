//requires
//Llamo el archivo de configuración
const expres = require('./config/config');
const express = require('express');
//variable app que llame a express
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//jsonwebtoken
const jwt = require('jsonwebtoken');

//localstorage: si no encuentra un local storage donde almacenar las cosas
//crea una carpeta llamada scratch  para guardar dicha información
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }


//path para organizar las carpetas
//permite que public este visible para todos
const directoriopublico = path.join(__dirname, '../public')
//constante de bootstrap 
const dirNode_modules = path.join(__dirname , '../node_modules')

//Static
//Saca las cosas que están publicas
app.use(express.static(directoriopublico));
//llama bootstrap, javascript de jquerry y javascript de popper.js
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

//midewore: En este caso solo deja que siga el proceso
app.use((req,res,next)=>{
    //leemos el token para saber si ingreso o no
    let token= localStorage.getItem(token);
    jwt.verify(token, 'cursos-online-123',(err, decoded)=> {
        if(err){
            return next()
        }
        console.log(decoded.foo) // bar
        res.locals.session = true
        res.locals.nombre = decoded.data.nombre
        req.usuario = decoded.data
        next()
      });
    next()
})


//BodyParser
//Permite traer elementos tipo string
app.use(bodyParser.urlencoded({extended:false}));

//Routes: Leo la variable  app
app.use(require('./routes/index'));

//Conectar con mongoose: Agregar el puerto y la base de datos
mongoose.connect('mongodb://localhost:27017/cursosVirtulaes', {useNewUrlParser: true},(err, resultado)=>{
    if(err){
        return console.log(err);
    }
    console.log('Conectado a la base de datos mongodb');
});

//Escucha la variable que está desde el entorno 
app.listen(process.env.PORT, ()=>{
    console.log('Servidor en el puerto' + process.env.PORT)
});




