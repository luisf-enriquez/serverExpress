const express = require('express')
const router = express.Router();
const expressJoi = require('express-joi-validator');

const schemas = require('../config/schemas');
const pruebas = require('../controllers/pruebas');

router.get('/api/v1/holaMundo', (req, res) => {
    pruebas.helloWorld(res, req.query);
});

router.post('/api/v1/createUserSchema', (req, res) => {
    pruebas.createUserSchema(res, req.body);
});

module.exports = router;