const express = require('express');
const app = express();

const pruebas = require('./pruebas');
const categorias = require('./categorias');
const producto = require('./producto');
const login = require('./login');
const upload = require('./upload');
const imagenes = require('./imagenes');

app.use('/pruebas', pruebas);
app.use('/login', login);
app.use('/categorias', categorias);
app.use('/producto', producto);
app.use('/upload', upload);
app.use('/imagenes', imagenes);

module.exports = app;