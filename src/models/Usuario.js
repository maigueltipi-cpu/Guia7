const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido']
  },
  // select:false -> la contraseña nunca sale en las consultas por defecto
  password: { type: String, required: [true, 'La contraseña es obligatoria'], minlength: [6, 'Mínimo 6 caracteres'], select: false },
  fechaCreacion: { type: Date, default: Date.now }
});

// Encripta la contraseña antes de guardar (nunca se guarda en texto plano)
UsuarioSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UsuarioSchema.methods.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
