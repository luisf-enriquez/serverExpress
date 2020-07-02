const configFirestore = require('./config');
const moment = require('moment-timezone');

const createSchema = async (collection, data) => {
    return await configFirestore.createDocRandomId(collection, data)
};

const createNewBySchema = async (collection, doc, data) => {
    try {
        doc.cedula = Number(data.documento);
        doc.nombre = data.nombre;
        doc.apellido = data.apellido;
        doc.fecha_creacion = Number(moment().tz('America/Bogota').format('x'));
        const response = await configFirestore.createDocRandomId(`${collection}_resumen`, docToSave);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = {
    createSchema,
    createNewBySchema,
}
