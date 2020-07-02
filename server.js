const http = require('http');
const config = require('./config/config');
const app = require('./app');

const server = http.createServer(app);

// Escuchar el servidor en el puerto determinado

server.listen(process.env.PORT || config.server.puerto);

console.log(`-------------- ${config.parametros.nombre} escuchando por el puerto ${config.server.puerto} en ${config.parametros.entorno} --------------`);
