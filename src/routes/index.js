//requires
const express = require('express');
//variable app que llame a express
const app = express();
const path = require('path');
const hbs = require('hbs');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');
const Cursoxusuario = require('../models/cursoxusuario')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



//Indicar en donde están los partials
const directorioViews = path.join(__dirname,'../../template/views')
const directorioPartials = path.join(__dirname,'../../template/partials');

//helpers
//helper(funciones terminadas en hbs)
require('./../helpers/helpers');

//hbs
//Trae el motor de hbs 
app.set('view engine', 'hbs');
//indica que la carpeta views va a estar en directorioViews
app.set('views', directorioViews);
//registra los partials que estan en la carpeta directorioPartials
hbs.registerPartials(directorioPartials);

//Página de incio:Cuando el usuario ingrese a la platafora(url)
app.get('/',(req, res)=>{
    //Creamos el render para que la página dinámica(index.hbs) sea renderizada
    res.render('index', {
        //Se debe declarar sino lanza un error
    });
});

app.post('/',(req, res)=>{
    let usuario = new Usuario({
       cedula: req.body.cedula,
       nombre: req.body.nombre,
       correo: req.body.correo,
       telefono: req.body.telefono,
       contraseña: bcrypt.hashSync(req.body.contraseña, 10)
    });

    //Guardamos el usuario en la base de datos
    usuario.save((err,resultado)=>{
        if(err){
            return res.render('indexpost',{
                //la varible mostrar debe estar en indexpost
                mostrar: `<div class="alert alert-danger" role="alert">
                       El usuario con cédula ${req.body.cedula} ya existe en la base de datos 
                       por favor ingrese que no este registrada
                        </div>`
            });
        }
            res.render('indexpost',{
                //la varible mostrar debe estar en indexpost
                mostrar: `<div class="alert alert-success" role="alert">
                            Bienvenid@  ${resultado.nombre} al sistema de cursos online, tú registro ha sido exitoso,
                            esperamos que aproveches y disfrutes al maximo esta plataforma. Equipo de curso online
                             </div>`
                    
            });
    });
});

app.get('/crear_curso',(req,res)=>{
    res.render('crear_curso');
});

app.post('/crear_curso_verificado',(req,res)=>{
    let curso = new Curso({
        id:req.body.id,
        nombre: req.body.nombre,
        valor:  req.body.valor,
        modalidad: req.body.modalidad,
        intensidadHoraria: req.body.intensidadHoraria,
        descripcion: req.body.descripcion
    });
    curso.save((err, resultado)=>{
        if(err){
            return res.render('crear_curso_verificado',{
                respuesta: `<div class="alert alert-danger" role="alert">
                            El curso con el id ${req.body.id} ya se encuentra en la base de datos
                            por ingrese un id que no este en la base de datos
                            </div>`
            });
        }
        res.render('crear_curso_verificado',{
            respuesta: `<div class="alert alert-success" role="alert">
                        El curso ${resultado.nombre} fue creado exitosamente <br>
                        Tiene un id de: ${resultado.id} <br>
                        Una duración de: ${resultado.intensidadHoraria} horas <br>
                        Un precio de: ${resultado.valor} <br>
                        La modalidad es: ${resultado.modalidad} <br>
                        Y su descripción es: ${resultado.descripcion} <br>
                        </div>`
        })
    });
});

app.get('/ver_curso',(req,res)=>{
    Curso.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log('Error al ver_curso'+ err);
        }
        res.render('ver_curso',{
            listado: respuesta
        });
    });
});

app.post('/actualizar_curso',(req,res)=>{
    Curso.findOneAndUpdate({id: req.body.curso},{estado:'cerrado'},{new:true},(err,resultado)=>{
        if(err){
            return console.log('error al actualiar curso' + err);
        }

        if(!resultado){
            return console.log('No se encontro curso para actualizar');
        }

        res.render('actualizar_curso',{
            nombre: resultado.nombre,
        });
    });
});

app.get('/ver_curso_interesado',(req,res)=>{
    Curso.find({estado:'disponible'}).exec((err,respuesta)=>{
        if(err){
            return console.log('Error al ver_curso'+ err);
        }
        if(!respuesta){
            return console.log('No hay curso disponibles');
        }
        res.render('ver_curso_interesado',{
            listado: respuesta
        });
    });
});

app.get('/inscribir',(req,res)=>{
    Curso.find({estado:'disponible'}).exec((err,respuesta)=>{
        if(err){
            return console.log('Error al ver_curso'+ err);
        }
        res.render('inscribir',{
            listado: respuesta
        });
    });
});

app.post('/inscribir_verificado',(req,res)=>{
    Cursoxusuario.find({id:req.body.curso,cedula:req.body.cedula}).exec((err,respuesta)=>{
        if(err){
            return res.render('inscribir_verificado',{
                respuestainscribir:`<div class="alert alert-danger" role="alert">
                                     Ocurrio un erro al intentar registrar el curso en la base de datos
                                    </div>`    
            }) 
        }
        if(respuesta.length>=1){
            res.render('inscribir_verificado',{
                respuestainscribir: `<div class="alert alert-danger" role="alert">
                                usted ya se encuentra registrad@ en este curso
                            </div>`
            });
        }else{
            let cursoxusuario = new Cursoxusuario({
                id:req.body.curso,
                cedula: req.body.cedula
            });
        
            cursoxusuario.save((err, resultado)=>{
                if(err){
                    return res.render('inscribir_verificado',{
                        respuestainscribir: `<div class="alert alert-danger" role="alert">
                                    Error al ingresar el curso en la base de datos
                                    </div>`
                    });
                }
                res.render('inscribir_verificado',{
                    respuestainscribir: `<div class="alert alert-success" role="alert">
                                El usuario con cedula ${resultado.cedula} fue inscrito exitosamente
                                en el curso con id  ${resultado.curso}
                                </div>`
                });
            });
        }
    });
});


app.get('/ver_inscritos',(req,res)=>{
    Curso.find({}).exec((err,respuesta)=>{
        if(err){
            return console.log('Error al ver_curso'+ err);
        }
        res.render('ver_inscritos',{
            cursos: respuesta
        });
    });
});

app.post('/ingresar',(req,res)=>{
    Usuario.findOne({nombre:req.body.usuario},(err,resultado)=>{
        if(err){
            return res.render('ingresar',{
                mensaje: `<div class="alert alert-danger" role="alert">
                            Ocurrió un error al interno favor intente de nuevo más tarde
                            </div>`
            })
        }
        if(!resultado){
            return res.render('ingresar',{
                mensaje: `<div class="alert alert-danger" role="alert">
                            Ocurrió un error las credenciales del usuario no son validas por favor intente de nuevo
                            </div>`
            })    
        }
        if(!bcrypt.compareSync(req.body.contraseña, resultado.contraseña)){
            return res.render('ingresar',{
                mensaje: `<div class="alert alert-danger" role="alert">
                            Ocurrió un error las credenciales del usuario no son validas por favor intente de nuevo
                            </div>`
            }) 
        }
        res.render('ingresar',{
            mensaje: `<div class="alert alert-success" role="alert">
                        Bienvenid@ ${resultado.nombre} al sistema de cursos
                        </div>`
        }) 

    });
    
});

//Página de error
app.get('*',(req,res)=>{
    res.render('error',{
        //debe traer estudiante porque header lo está pidiendo
        curso: 'error'
    });
});

//Exporto el app
module.exports = app