//Con env se crea la variable global del entorno de trabajo del usuario
// de puerto que es el puerto 3000 u otro puerto que me va a lanzar heroku
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local'){
	urlDB = 'mongodb://localhost:27017/asignaturas';
}
else {
	urlDB = 'mongodb+srv://nodejstdea:nodejstdea@nodejstdea-4jn4i.mongodb.net/asignaturas?retryWrites=true'
}

process.env.URLDB = urlDB