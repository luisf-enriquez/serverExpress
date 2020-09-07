const Joi = require('joi');

const userSchema = {
    body: {
        nombre: Joi.string().required(),
        cedula: Joi.number().required(),
        apellido: Joi.string().required(),
    }
};

const weather = {
    query: {
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        units: Joi.string().allow(null,''),
    }
};

const user = {
    body: {
        nombre: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().allow(null, ''),
        google: Joi.boolean().allow(null,''),
        estado: Joi.boolean().allow(null,''),
    }
};

const update = {
    body: {
        id: Joi.string().allow(null, ''),
        nombre: Joi.string().allow(null,''),
        email: Joi.string().allow(null,''),
        role: Joi.string().allow(null, ''),
        estado: Joi.boolean().allow(null,''),
    }
};

const login = {
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
};

const getById = {
    query: {
        id: Joi.string().required(),
    }
};

const category = {
    body: {
        descripcion: Joi.string().required(),
        id: Joi.string().allow(null, ''),
    }
};

const product = {
    body: {
        id: Joi.string().allow(null, ''),
        nombre: Joi.string().required(),
        precioUni: Joi.number().required(),
        descripcion: Joi.string().allow(null, ''),
        categoria: Joi.string().required(),
        disponible: Joi.boolean().default(true),
    }
};

const searchProduct = {
    query: {
        termino: Joi.string().required()
    }
};

const fileUpload = {
    body: {
        tipo: Joi.string().required(),
        id: Joi.string().required(),
    }
};

const img = {
    query: {
        tipo: Joi.string().required(),
        img: Joi.string().required(),
        token: Joi.string().required()
    }
}

module.exports = {
    userSchema,
    weather,
    user,
    update,
    login,
    getById,
    category,
    product,
    searchProduct,
    fileUpload,
    img
}