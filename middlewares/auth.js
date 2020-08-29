const jwt = require('jsonwebtoken');
const config = require('../config/config')
const utils = require('../config/utils');

// Este middleware revisa el token generado por JWT al hacer el login, pero la verificacion se hace
// tomando el token que viene en elos headers (enviado desde la peticion en el front) otra opcion es hacerlo por la URL
module.exports.checkToken = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, config.parametros.secret, (err, decoded) => {
        if (err) {
            utils.buildResponse(res, 401, { error: err }, 'Se presentan problemas con el token de autorizacion' );
        } else {
            req.user = decoded.user;
            next();
        }
    });
};

module.exports.checkAdminRole = (req, res, next) => {
    const { role } = req.user;
    if (role === 'USER_ROLE') {
        utils.buildResponse(res, 401, [], 'El usuario no tiene permisos de administrador para realizar esta tarea')
    } else {
        next();
    }
};

module.exports.checkImgToken = (req, res, next) => {
    const token = req.query.token;
    jwt.verify(token, config.parametros.secret, (err, decoded) => {
        if (err) {
            utils.buildResponse(res, 401, { error: err }, 'Se presentan problemas con el token de autorizacion' );
        } else {
            req.user = decoded.user;
            next();
        }
    });
};
