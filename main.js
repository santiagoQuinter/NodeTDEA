let curso = require("./historias")
const express = require('express')
const app = express()
let texto

for(var i =1;i<=4;i++){
  // setTimeout(() => {
       
       curso.listarCursos(i,function(cur){
          texto= cur;
        });
   // }, 2000);
}


 
app.get('/', function (req, res) {
  res.send('<h1>'+ texto.nombre+ '</h1>')
})
 
app.listen(3000)