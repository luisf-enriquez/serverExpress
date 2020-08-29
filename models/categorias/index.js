const Categoria = require('../../schemas/categoria');
const utils = require('../../config/utils');

const saveOne = async (data) => {
    try {
        const result = await data.save();
        return { status: 200, result };
    } catch (error) {
        console.log(error);
        return { status: 500, error };
    }
};

const findAllByKey = async (query = {}, fields = '') => {
    try {
        return await Categoria.find(query).populate('usuario', fields).sort('descripcion'); // find(query, 'nombre email')
    } catch (error) {
        console.log(error);
    }
};

const findById = async (id, fields = '') => {
    try {
        return await Categoria.findById(id).populate('usuario', fields).sort('descripcion'); // find(query, 'nombre email')
    } catch (error) {
        console.log(error);
    }
};

const updateById = async (id, data) => {
    try {
        return await Categoria.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query'});
    } catch (error) {
        console.log(error);
        return { status: 500, error: error };
    }
};

const deleteById = async (id) => {
    try {
        return await Categoria.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    saveOne,
    findAllByKey,
    findById,
    updateById,
    deleteById
}