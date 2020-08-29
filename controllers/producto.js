const utils = require('../config/utils');
const modelMongo = require('../models/producto');
const Producto = require('../schemas/producto');

module.exports.createProduct = async (res, data, next) => {
    try {
      let producto = new Producto({
        nombre: data.body.nombre,
        precioUni: data.body.precioUni,
        descripcion: ('descripcion' in data.body) ? data.body.descripcion : '',
        categoria: data.body.categoria,
        usuario: data.user._id,
      });
      const response = await modelMongo.saveOne(producto);
      if (response.status === 200) {
        utils.buildResponse(res, response.status, response.result, 'Documento creado correctamente');
      } else {
        utils.buildResponse(res, response.status, response.error.message, 'Error durante la creacion de la categoria');
      }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getAllProducts = async (res, data, next) => {
  try {
    const result = await modelMongo.findAllByKey({ disponible: true }, 'nombre email');  
    utils.buildResponse(res, 200, result, 'Documentos consultados correctamente');
  } catch (error) {
      console.log(error);
      next(error);
  }
};

module.exports.getById = async (res, data, next) => {
  try {
    const result = await modelMongo.findById(data.id);  
    utils.buildResponse(res, 200, result, 'Documento consultado correctamente');
  } catch (error) {
      console.log(error);
      next(error);
  }
};

module.exports.findProducts = async (res, data, next) => {
  try {
    let regExp = new RegExp(data.termino, 'i');
    const result = await modelMongo.findAllByKey({ nombre: regExp }, 'nombre email');  
    utils.buildResponse(res, 200, result, 'Documento consultado correctamente');
  } catch (error) {
      console.log(error);
      next(error);
  }
};

module.exports.updateProduct = async (res, data, next) => {
  try {
      const updateBody = { 
        descripcion: data.descripcion,
        nombre: data.nombre,
        precioUni: data.precioUni,
        categoria: data.categoria,
        disponible: data.disponible, 
      };
      const result = await modelMongo.updateById(data.id, updateBody);
      if (result.status === 500) {
        utils.buildResponse(res, result.status, result.error, "error durante la actualziacion");
      } else {
        utils.buildResponse(res, 200, result, "Documento actualizado correctamente");
      }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.deleteProduct = async (res, data, next) => {
  try {
    // const result = await modelMongo.deleteById(data.id);
    const result = await modelMongo.updateById(data.id, { disponible: false });
    if (result === null) {
      utils.buildResponse(res, 400, result, "El documneto con el id solictado no existe");
    } else {
      utils.buildResponse(res, 200, result, "Documento eliminado correctamente");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
