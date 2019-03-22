//Este Modulo contienes los diferentes cursos de educación ofertados
let cursos=[{
    id: 1,
    nombre: "Cursos de inglés nivel 1",
    duracion: "7 semanas",
    valor: 150000,
    fechaInicio: "20/04/2019",
},
{
    id :2, 
    nombre: "Curso interpretación de pruebas genéticas en procesos judiciales",
    duracion: "8 semanas",
    valor: "gratis",
    fechaInicio: "20/04/2019",

},
{
    id:3,
    nombre: "Escuela de iniciación deportiva",
    duracion: "5 semanas",
    valor:90000,
    fechaInicio:"20/04/2019",
},
{
    id:4,
    nombre: "introducción a Node.JS mediante el desarrollo de un proyecto ágil",
    duracion: "5 semanas",
    valor :"gratis",
    fechaInicio:"11/03/2019",
}]

let listarCursos=(identificador,callback)=>{
    //for(var i=1;i<=cursos.length;i++){
    setTimeout(function(){
        //Devuelte el objeto que coincide con el id
        let curso = cursos.find(cur=>cur.id==identificador)
        /*console.log(curso.id+"\n"+
                    curso.nombre +"\n" +
                    curso.duracion + "\n" +
                    curso.valor + "\n" +
                    curso.fechaInicio + "\n");   */
    callback (curso)
    },2000);
    //}
}

/*setTimeout(function(){
    listarCursos(1,function(cur){
        console.log(cur);

    });
});*/

setTimeout(function(){
    listarCursos(1,function(cur){
            console.log(cur)
            listarCursos(2,function(cur){
                console.log(cur)
                listarCursos(3,function(cur){
                    console.log(cur)
                    listarCursos(4,function(cur){
                        console.log(cur)
                    })
                });
            });
    });
},2000)

/*for(var i =1;i<=4;i++){
    setTimeout(function() {
         listarCursos(i,function(cur){
             console.log(cur);
          });
    }, 2000);
    setTimeout(2000);
  }*/

/*for(var i=0;i<=4;i++){
    setTimeout(function(){
        console.log("Espere 2 segundos " + i);
    },2000);
    console.log("El ciclo continua con: " + i)
}*/

module.exports ={
    listarCursos,
    cursos
};
