const productoService = require('../services/productoService');
const asyncHandler = require('../utils/asyncHandler');

// 1. POST /api/productos
exports.crearProducto = asyncHandler(async (req, res) => {
  const producto = await productoService.crear(req.body);
  res.status(201).json({ status: 'OK', data: producto });
});

// 2. GET /api/productos
exports.obtenerProductos = asyncHandler(async (req, res) => {
  const productos = await productoService.listar();
  res.json({ status: 'OK', total: productos.length, data: productos });
});

// 3. GET /api/productos/:id
exports.obtenerProductoPorId = asyncHandler(async (req, res) => {
  const producto = await productoService.buscarPorId(req.params.id);
  if (!producto) return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
  res.json({ status: 'OK', data: producto });
});

// 4. PUT /api/productos/:id
exports.actualizarProducto = asyncHandler(async (req, res) => {
  const producto = await productoService.actualizar(req.params.id, req.body);
  if (!producto) return res.status(404).json({ status: 'Error', message: 'Producto no encontrado' });
  res.json({ status: 'OK', data: producto });
});

// 5. DELETE /api/productos/:id
exports.eliminarProducto = asyncHandler(async (req, res) => {
  const eliminado = await productoService.eliminar(req.params.id);
  if (!eliminado) return res.status(404).json({ status: 'Error', message: 'No existe el producto' });
  res.json({ status: 'OK', message: 'Producto eliminado con éxito' });
});

// 6. GET /api/productos/categoria/:cat
exports.filtrarPorCategoria = asyncHandler(async (req, res) => {
  const productos = await productoService.filtrarPorCategoria(req.params.cat);
  res.json({ status: 'OK', categoria: req.params.cat, total: productos.length, data: productos });
});
