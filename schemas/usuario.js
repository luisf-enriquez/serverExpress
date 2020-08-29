const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;
const validRoles = {
	values: ['ADMIN_ROLE','USER_ROLE'],
	message: '{VALUE} no es un rol valido',
};

const usuarioSchema = new Schema({
	nombre: {type: String, required: [true, 'Nombre es requerido' ]},
	email: { type: String, required: [true, 'El correo es necesario'], unique: true },
	password: { type: String, required: true },
	img: { type: String, required: false},
	role: { type : String , default: 'USER_ROLE', enum: validRoles },
	estado: { type: Boolean, default: true },
	google: { type: Boolean, default: false }
}, { strict: false });

// para no regresar la contrasena
usuarioSchema.methods.toJSON = function () {

	let user =  this;
	let userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);
