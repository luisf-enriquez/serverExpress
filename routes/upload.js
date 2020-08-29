const express = require('express');
const router = express.Router();
const expressJoi = require('express-joi-validator');
const fileUpload = require('../services/expressUpload');

const schemas = require('../config/schemas');
const pruebas = require('../controllers/pruebas');

// paso el fileupload, multer como si fuese un middleware del endpoint para que pueda detectar el archvio enviado
router.put('/api/v1/uploadFile', fileUpload, expressJoi(schemas.fileUpload), (req, res, next) => {
    pruebas.uploadFile(res, req, next);
});

module.exports = router;