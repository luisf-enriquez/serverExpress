const Joi = require('joi');

const userSchema = {
    body: {
        nombre: Joi.string().required(),
        cedula: Joi.number().required(),
        apellido: Joi.string().required(),
    }
};

module.exports = {
    userSchema,
}