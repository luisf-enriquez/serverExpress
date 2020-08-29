const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const client = new OAuth2Client(config.apiKey.google_client_id);
const utils = require('../config/utils');
const modelMongo = require('../models/pruebas');
const Usuario = require('../schemas/usuario');

module.exports.loginUser = async (res, data, next) => {
    try {
        await modelMongo.findUser(res, data);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Configuracion google para verificar el token de google Sign in

async function verify (token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.apiKey.google_client_id, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  return {
      nombre: payload.name,
      img: payload.picture,
      email: payload.email,
      google: true,
  };
};

module.exports.loginGoogleUser = async (res, data, next) => {
    try {
        const googleUser = await verify(data.idtoken);
        // se determina si el usuario existe o no en la base de datos;
        const user = await modelMongo.findAllByKey({ email: googleUser.email });

        if (user[0].length) {
            if (user[0].google === false) {
                utils.buildResponse(res, 400, {}, 'Debe usar autenticacion normal, no se permite login con google')
            } else {
                const token = jwt.sign(
                    { 
                        user: user[0], // payload a usar con el JWT
                    }, config.parametros.secret, { expiresIn: config.parametros.expToken });
                utils.buildResponse(res, 200, { user: user[0], token }, 'Datos correctos');
            }
        } else { // si el usuario no existe en la base de datos, lo creamos y generamos el token de JWT para que pueda usar los servicios
            const response = await creteNewUser(googleUser);
            utils.buildResponse(res, 201, response, 'Usuario creado satisfactoriamente');
        }
    } catch (error) {
        console.log(error);
        utils.buildResponse(res, 403, { error }, 'Se presentan errores mediante el Login con google');
    }
};

const creteNewUser = async (data) => {
    try {
        let usuario = new Usuario ({
            nombre: data.nombre,
            email: data.email,
            img: data.img,
            google: data.google,
            password: ':)'
        });
        const user = await modelMongo.saveOne(usuario);
        const token = jwt.sign(
            { 
                user, // payload a usar con el JWT
            }, config.parametros.secret, { expiresIn: config.parametros.expToken });
        return { user, token };
    } catch (error) {
        console.log(error);
    }
};