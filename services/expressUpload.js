const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload()); // default settings

module.exports = app;