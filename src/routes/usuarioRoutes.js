const express = require('express');
const router = express.Router();
const c = require('../controllers/usuarioController');

router.post('/registro', c.registrarUsuario); // 7
router.post('/login', c.loginUsuario);         // 8
router.get('/', c.listarUsuarios);             // 9

module.exports = router;
