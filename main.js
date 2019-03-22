let curso = require("./historias")

for(var i =1;i<=4;i++){
  // setTimeout(() => {
       
       curso.listarCursos(i,function(cur){
           console.log(cur);
        });
   // }, 2000);
}