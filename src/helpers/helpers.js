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

hbs.registerHelper('verInscritos',()=>{
    return funciones.verInscritos();
});


hbs.registerHelper('eliminarAspirante',(identificacion)=>{
    return funciones.eliminarAspirante(identificacion);

});

hbs.registerHelper('actualizarCurso',(curso)=>{
    return funciones.actualizarCurso(curso);
});