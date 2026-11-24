const express = require('express');
const router = express.Router();
const c = require('../controllers/productoController');
const validarId = require('../utils/validarId');

router.post('/', c.crearProducto);                       // 1
router.get('/', c.obtenerProductos);                     // 2
// IMPORTANTE: /categoria/:cat va ANTES de /:id, si no Express tomaría "categoria" como un id
router.get('/categoria/:cat', c.filtrarPorCategoria);    // 6
router.get('/:id', validarId, c.obtenerProductoPorId);   // 3
router.put('/:id', validarId, c.actualizarProducto);     // 4
router.delete('/:id', validarId, c.eliminarProducto);    // 5

module.exports = router;
