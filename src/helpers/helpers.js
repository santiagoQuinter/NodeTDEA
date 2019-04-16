const Usuario = require('../models/usuario');
const Cursoxusuario = require('../models/cursoxusuario')

//helper(funciones terminadas en hbs)
const hbs = require('hbs');
//trae funciones
const funciones = require('./funciones');

hbs.registerHelper('listarCursos',(listado)=>{
    let retorno = `<table class="table">
                   <thead class="thead-dark">
                   <th scope="col">ID</th>
                   <th scope="col">NOMBRE</th>
                   <th scope="col">VALOR</th>
                   <th scope="col">DESCRIPCIÓN</th>
                   <th scope="col">MODALIDAD</th>
                   <th scope="col">INTENSIDAD HORARIA</th>
                   <th scope="col">ESTADO</th>
                   </thead>
                   <tbody>`;    

    listado.forEach(curso => {
    retorno += ` <tr>
                <td> ${curso.id} </td>
                <td> ${curso.nombre} </td>
                <td> ${curso.valor}</td>
                <td> ${curso.descripcion} </td>
                <td> ${curso.modalidad} </td>
                <td> ${curso.intensidadHoraria} </td>
                <td> ${curso.estado} </td>
                </tr>`;
        
    });
    retorno += `</tbody>
                </table>`;
    return retorno;
});

hbs.registerHelper('listarCursoInscribir', (listado)=>{
    let retorno = `<select class="custom-select  col-5" name="curso" id="cursoSeleccionado">`;    
    listado.forEach(curso => {
    //Solo muestra los cursos disponibles
        if(curso.estado == 'disponible'){
            retorno += `<option value="${curso.id}">${curso.nombre}</option>`;
        }
    });
    retorno += `</select>`;
    return retorno;
});


hbs.registerHelper('listarCursosInteresado', (listado)=>{
    let retorno = `<div class="accordion" id="accordionExample">`;    
    i=1
    listado.forEach(curso => {
    //Solo muestra los cursos disponibles
    retorno += `<div class="card">
                    <div class="card-header" id="heading${i}">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        Nombre del curso: ${curso.nombre}
                        >>>Valor: ${curso.valor} <br>
                        Descripción: ${curso.descripcion}    
                        </button>
                    </h5>
                    </div>
                    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">
                            <b> Nombre:</b> ${curso.nombre} <br>
                            <b> Valor:</b> ${curso.valor} <br>
                            <b> Descripción:</b> ${curso.descripcion} <br>
                            <b> Modalidad:</b> ${curso.modalidad} <br>
                            <b> Intensidad horaria:</b> ${curso.intensidadHoraria} <br>
                        </div>
                    </div>`;
                    i++;
    });
    retorno += `</div>`;
    return retorno;
});

hbs.registerHelper('verInscritos',(listaCursos)=>{
    let retorno=``;
    //Recorro la lista de cursos y por cada uno busco los aspirantes de dicho curso
    i=0
    listaCursos.forEach(cursos => {
            retorno += `<div class="card accordion" id="accordionExample">
                        <div class="card-header" id="heading${i}">
                            <h5 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                Nombre del curso: ${cursos.nombre}
                                </button>
                            </h5>
                        </div>  

                        <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">

                        <form action='/eliminar_aspirante' method='post'>
                        
                        <table class="table">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col">Documento</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                        </thead>
                        <tbody>`;  

            Cursoxusuario.find({id:cursos.id}).exec((err,respuesta)=>{
                if(err){
                    return console.log('Error al realiar la consulta de cursoxusuario por cada curso'+ err);
                }
           
            //si la lista de matriculado es igual a cero no hay estudiantes en el curso
            if (respuesta.length >=1) {  
                     
                respuesta.forEach(aspirante => {
                               
                    Usuario.find({cedula:aspirante.cedula}).exec((err,respuestaUsuario)=>{
                        console.log('llegueeeeeeeeeeeee')  
                        if(respuestaUsuario>=1){
                            console.log('nulooooooooo'+respuesta.nombre +'   '+respuesta.cedula)  
                        }
                        if(err){
                            return console.log('Error al consultar el curso desde cursoxusuario(compara cédulas)'+ err);
                        }
                        retorno += `<tr>    
                                    <td>${respuestaUsuario.cedula}</td>                
                                    <td>${respuestaUsuario.nombre}</td>
                                    <td>${respuestaUsuario.correo}</td>
                                    <td>${respuestaUsuario.telefono}</td>
                                    <td><button type="submit" name="EliminarAspirante" value="${respuestaUsuario.cedula}" class="btn btn-danger"> Eliminar</button> </td>
                                    </tr>`;
                    });
                });
            }
        });
        retorno += `
                    </tbody>
                    </table>
                    </div>
                    </div>
                    </div>`;   
        i++;
    });

    return retorno;  
});










hbs.registerHelper('crearCurso',(id, nombre, valor, descripcion, modalidad, intensidadHoraria)=>{
    let cur = {
        id: id,
        nombre : nombre,
        valor : valor,
        descripcion: descripcion,
        modalidad: modalidad,
        intensidadHoraria: intensidadHoraria,
        estado: 'disponible'
    };
    //Prueba de llamada a la funcion crear
    return funciones.crear(cur);
});


hbs.registerHelper('inscribirAspirante',(identificacion, nombre, correo, telefono, curso)=>{
    let aspi={
        identificacion:identificacion,
        nombre:nombre,
        correo:correo,
        telefono:telefono,
        curso:curso
    }
    return funciones.inscribirAspirante(aspi);
});



hbs.registerHelper('eliminarAspirante',(identificacion)=>{
    return funciones.eliminarAspirante(identificacion);

});

hbs.registerHelper('actualizarCurso',(curso)=>{
    return funciones.actualizarCurso(curso);
});