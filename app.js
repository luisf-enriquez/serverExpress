const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config/config');
const pruebas = require('./routes/pruebas');
const categorias = require('./routes/categorias');
const producto = require('./routes/producto');
const login = require('./routes/login');
const upload = require('./routes/upload');
const imagenes = require('./routes/imagenes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', config.server.corsOrigins);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization, token_refresh');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// habilitar el public
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/pruebas', pruebas);
app.use('/login', login);
app.use('/categorias', categorias);
app.use('/producto', producto);
app.use('/upload', upload);
app.use('/imagenes', imagenes);

// Custom 404 route not found handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "No existe la ruta",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: "Hubo un error",
  });
});

module.exports = app;