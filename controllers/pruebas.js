const utils = require('../config/utils');
const create = require('../models/create');

module.exports.createUserSchema = async (res, data) => {
    try {
        await create.createSchema('usuarios_esquema', data);
        utils.buildResponse(res, 201, {}, 'Esquema creado correctamente');
    } catch (error) {
        utils.buildResponse(res, 400, {}, error);
    }
};

module.exports.helloWorld = (res, data) => {
    try {
        utils.buildResponse(res, 200, {}, 'Hola Mundo desde Node JS');
    } catch (error) {
        utils.buildResponse(res, 400, {}, error);
    }
};