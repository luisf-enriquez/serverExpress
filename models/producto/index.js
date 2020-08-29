const Producto = require('../../schemas/producto');

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
        return await Producto.find(query).populate('categoria', 'descripcion').populate('usuario', fields); // find(query, 'nombre email')
    } catch (error) {
        console.log(error);
    }
};

const findById = async (id, fields = '') => {
    try {
        return await Producto.findById(id).populate('categoria', 'descripcion').populate('usuario', fields); // find(query, 'nombre email')
    } catch (error) {
        console.log(error);
    }
};

const updateById = async (id, data) => {
    try {
        return await Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } catch (error) {
        console.log(error);
        return { status: 500, error: error };
    }
};

const deleteById = async (id) => {
    try {
        return await Producto.findByIdAndRemove(id);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    saveOne,
    findAllByKey,
    findById,
    deleteById,
    updateById
}