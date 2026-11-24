const Usuario = require('../models/Usuario');
const generarToken = require('../utils/generarToken');

exports.registrar = async ({ nombre, email, password }) => {
  const usuario = await Usuario.create({ nombre, email, password });
  return { _id: usuario._id, nombre: usuario.nombre, email: usuario.email };
};

// Devuelve { token, usuario } o null si las credenciales son inválidas
exports.autenticar = async (email, password) => {
  // +password porque en el esquema está con select:false
  const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!usuario || !(await usuario.compararPassword(password))) return null;

  return {
    token: generarToken(usuario),
    usuario: { _id: usuario._id, nombre: usuario.nombre, email: usuario.email }
  };
};

exports.listar = () => Usuario.find(); // password no sale (select:false)
