const express = require('express')
const router = express.Router();
const expressJoi = require('express-joi-validator');

const schemas = require('../config/schemas');
const pruebas = require('../controllers/pruebas');
const { checkToken, checkAdminRole} =  require('../middlewares/auth');

// usuarios.param('id', function (req, res, next, id) {
//     dal.obtener(id)
//     .then(function(usuario) {
//         if (usuario) {
//             res.locals.usuario = usuario;
//             next();
//         } else {
//             res.status(404).json({error: 'usuario no encontrado'});
//         }
//     })     
//  	.catch(returnError.bind(this, res));
// });

router.get('/api/v1/weather', expressJoi(schemas.weather), (req, res, next) => {
    pruebas.getCurrenWather(res, req.query, next);
});

router.post('/api/v1/createUserSchema', (req, res) => {
    pruebas.createUserSchema(res, req.body);
});

router.post('/usuarios', expressJoi(schemas.user), checkToken, /*checkAdminRole,*/ (req, res, next) => {
    pruebas.createUser(res, req.body, next);
});

// obtener usuario por id
router.get('/usuarios/:id', checkToken, (req, res, next) => {
    pruebas.getUserById(req, res, next);
});

// uso de middleware personalizado de autenticacion con JWT
router.get('/usuarios', checkToken, (req, res) => {
    pruebas.getAllUsers(res, req);
});

router.put('/usuarios/:id', expressJoi(schemas.update), checkToken, checkAdminRole, (req, res, next) => {
    pruebas.updateUser(req, res, next);
});

router.delete('/usuarios/:id', checkToken, checkAdminRole, (req, res, next) => {
    pruebas.deleteUser(req, res, next);
})

router.get('/get-token', (req, res) => {
    pruebas.getToken(req, res);
})


module.exports = router;