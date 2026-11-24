const Producto = require('../models/Producto');

exports.crear = ({ nombre, precio, categoria, stock }) =>
  Producto.create({ nombre, precio, categoria, stock });

exports.listar = () => Producto.find().sort({ fechaCreacion: -1 });

exports.buscarPorId = (id) => Producto.findById(id);

// Actualización TOTAL: se reemplazan todos los campos y save() corre todas las validaciones
exports.actualizar = async (id, { nombre, precio, categoria, stock }) => {
  const producto = await Producto.findById(id);
  if (!producto) return null;
  producto.set({ nombre, precio, categoria, stock: stock ?? 0 });
  return producto.save();
};

exports.eliminar = (id) => Producto.findByIdAndDelete(id);

exports.filtrarPorCategoria = (categoria) => {
  // Sin distinguir mayúsculas/minúsculas; se escapan caracteres especiales de regex
  const cat = categoria.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return Producto.find({ categoria: new RegExp(`^${cat}$`, 'i') });
};
