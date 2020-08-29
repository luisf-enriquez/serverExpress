const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const categoriaSchema = new Schema({
	descripcion: { type: String, unique: true, required: [true, 'descripcion es necesaria']},
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { strict: false });

categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Categoria', categoriaSchema);