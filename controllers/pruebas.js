const axios = require('axios');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

const utils = require('../config/utils');
const create = require('../models/create');
const config = require('../config/config');
const modelMongo = require('../models/pruebas');
const Usuario = require('../schemas/usuario');

module.exports.createUserSchema = async (res, data) => {
    try {
        await create.createSchema('usuarios_esquema', data);
        utils.buildResponse(res, 201, {}, 'Esquema creado correctamente');
    } catch (error) {
        utils.buildResponse(res, 400, {}, error);
    }
};

module.exports.getCurrenWather = async (res, data, next) =>{
    try {
        const result = await getWeatherCoord(data);
        utils.buildResponse(res, 200, result.data, 'Informacion Encontrada')
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.createUser = async (res, data, next) => {
    try {
        let user = new Usuario({
            nombre: data.nombre,
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
            role: data.role,
            google: data.google,
            estado: data.estado,
        });
        let result = await modelMongo.saveOne(user);
        utils.buildResponse(res, 201, result, 'Registro creado exitosamente');
    } catch (error) {
        console.log(error);
        next(error);
        utils.buildResponse(res, 500, { error: error.message }, 'Se ha generado un error durante el registro');
    }
};

module.exports.getAllUsers = async (res, data) => {
    try {
        const result = await modelMongo.findAllByKey();
        utils.buildResponse(res, 200, {users: result[0], total: result[1]}, 'Documentos encontrdos');
    } catch (error) {
        console.log(error);
        utils.buildResponse(res, 500, {}, error);
    }
};

module.exports.updateUser = async (res, data, next) => {
    try {
        let updateBody = {...data};
        delete updateBody.id;
        const result = await modelMongo.updateById(data.id, updateBody)
        utils.buildResponse(res, 200, result, 'Documento Actualizado con exito')
    } catch (error) {
        console.log(error);
        next(error);    
        utils.buildResponse(res, 500, { error: error.message }, 'Se ha generado un error durante la actualizacion');
    }
};

module.exports.uploadFile = async (res, req, next) => {
    try {
        if (!req.files) {
            utils.buildResponse(res, 400, {}, 'No se ha adjuntado ningun archivo')
        }
        else {
            const allowedExt = ['jpg', 'png', 'gif', 'jpeg'];
            const allowTypes = ['productos', 'usuarios'];

            let sampleFile =  req.files.archivo;
            const orignalName = sampleFile.name.split('.');
            const extension = orignalName[orignalName.length - 1];
            const newName = `${req.body.id}-${moment().format('x')}.${extension}`;

            if (!allowedExt.includes(extension)) {
                utils.buildResponse(res, 400, {}, `Las extensiones permitidas son ${allowedExt.join(', ')}`);
            } else if (!allowTypes.includes(req.body.tipo)) {
                utils.buildResponse(res, 400, {}, `Los tipos permitidos son ${allowTypes.join(', ')}`);
            } else{
                sampleFile.mv(`uploads/${req.body.tipo}/${newName}`, async (err) => {
                    if (err) {
                        utils.buildResponse(res, 500, {}, err);
                    }
                    // aqui la imagen ya esta en el FileSystem
                    await modelMongo.uploadFile(res, req.body.id, newName, req.body.tipo);
                    //utils.buildResponse(res, 200, {}, 'Documento cargado correctamente');
                });
            }
        }
    } catch (error) {
        console.log(error);
        next(error);   
    }
};

// ****************** Consultas Axios ***********************

const getWeatherCoord = async (data) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${config.apiKey.weatherKey}`
    return await axios.get(url);
};