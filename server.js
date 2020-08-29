const http = require('http');
const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

const server = http.createServer(app);

mongoose.connect(config.parametros.mongodb, { useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) {
        throw err;
    }
    console.log ('-------------- Database Online --------------');
});

// Escuchar el servidor en el puerto determinado

server.listen(process.env.PORT || config.server.puerto);

console.log(`-------------- ${config.parametros.nombre} escuchando por el puerto ${config.server.puerto} en ${config.parametros.entorno} --------------`);
