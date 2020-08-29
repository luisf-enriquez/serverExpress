const utils = require('../config/utils');
// const config = require('../config/config');
const modelMongo = require('../models/categorias');
const Categoria = require('../schemas/categoria');

module.exports.getAllCategories = async (res, data, next) => {
    try {
      const result = await modelMongo.findAllByKey({}, 'nombre email');  
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

module.exports.createCategory = async (res, data, next) => {
    try {
      let categoria = new Categoria({
        descripcion: data.body.descripcion,
        usuario: data.user._id,
      });
      const response = await modelMongo.saveOne(categoria);
      console.log(response);
      if (response.status === 200) {
        utils.buildResponse(res, response.status, response.result, 'Documento creado correctamente');
      } else {
        utils.buildResponse(res, response.status, response.error.message, 'Erro durante la creacion de la categoria');
      }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.updateCategory = async (res, data, next) => {
  try {
      const updateBody = { descripcion: data.descripcion };
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

module.exports.deleteCategory = async (res, data, next) => {
  try {
    const result = await modelMongo.deleteById(data.id);
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