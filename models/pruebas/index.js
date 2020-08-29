const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const Usuario = require('../../schemas/usuario');
const utils = require('../../config/utils');
const config = require('../../config/config');

const saveOne = async data => {
    try {
        return await data.save();
    } catch (error) {
        console.log(error);
    }
};

const findAllByKey = async (query = {}) => {
    try {
        const response = await Usuario.find(query); // find(query, 'nombre email')
        const count = await Usuario.countDocuments(query);

        return [response, count]; 
    } catch (error) {
        console.log(error);
    }
    
};

const updateById = async (id, data) => {
    try {
        return await Usuario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch (error) {
        console.log(error);
        return error
    }
};

const findUser = async (res, data) => {
    await Usuario.findOne({ email: data.email }, (err, response) => {
        if (err) {
            utils.buildResponse(res, 500, {}, err);
        }
        if (!response) {
            utils.buildResponse(res, 400, {}, 'No existe usario con los datos solicitados, Revisa tus datos de usario y/o contrasena');
        }
        else if (!(bcrypt.compareSync(data.password, response.password))) {
            utils.buildResponse(res, 400, {}, 'No existe usario con los datos solicitados, Revisa tus datos de usario y/o contrasena');
        }
        else {
            // se define el token para la autenticacion de seguridad, el secret va en la firma del JWT
            let token = jwt.sign(
              {
                user: response, // payload a usar con el JWT
              }, config.parametros.secret, { expiresIn: config.parametros.expToken });
            utils.buildResponse(res, 200, { user: response, token }, 'Datos correctos');
        }
    });
};

const uploadFile = async (res, id, filename, tipo) => {
    try {
        await Usuario.findById(id, async (err, user) => {
            if (err) {
                utils.buildResponse(res, 500, {}, err);
            }
            if (!user) {
                utils.buildResponse(res, 400, {}, `El usuario con el id ${id} no existe en la base de datos`)
            } else {
                user.img = filename;
                let filePath = (path.resolve(__dirname, `../../uploads/${tipo}/${user.img}`));
                // if (fs.existsSync(filePath)) {
                //     fs.unlinkSync(filePath);
                // }
                const result = await user.save();                
                utils.buildResponse(res, 200, { usuario: result , file: filename }, 'Archivo cargado satisfactoriamente');
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error(err);
    }
} 

module.exports = {
    saveOne,
    findAllByKey,
    updateById,
    findUser,
    uploadFile
}