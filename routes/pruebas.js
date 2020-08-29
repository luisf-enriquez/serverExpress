const express = require('express')
const router = express.Router();
const expressJoi = require('express-joi-validator');

const schemas = require('../config/schemas');
const pruebas = require('../controllers/pruebas');
const { checkToken, checkAdminRole} =  require('../middlewares/auth');

router.get('/api/v1/weather', expressJoi(schemas.weather), (req, res, next) => {
    pruebas.getCurrenWather(res, req.query, next);
});

router.post('/api/v1/createUserSchema', (req, res) => {
    pruebas.createUserSchema(res, req.body);
});

router.post('/api/v1/usuario', expressJoi(schemas.user), checkToken, checkAdminRole, (req, res, next) => {
    pruebas.createUser(res, req.body, next);
});

// uso de middleware personalizado de autenticacion con JWT
router.get('/api/v1/usuarios', checkToken, (req, res) => {
    pruebas.getAllUsers(res, req);
});

router.put('/api/v1/ususario', expressJoi(schemas.update), checkToken, checkAdminRole, (req, res, next) => {
    pruebas.updateUser(res, req.body, next);
});


module.exports = router;