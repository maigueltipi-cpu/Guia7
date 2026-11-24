const usuarioService = require('../services/usuarioService');
const asyncHandler = require('../utils/asyncHandler');

// 7. POST /api/usuarios/registro
exports.registrarUsuario = asyncHandler(async (req, res) => {
  const usuario = await usuarioService.registrar(req.body);
  res.status(201).json({ status: 'OK', message: 'Usuario registrado exitosamente', data: usuario });
});

// 8. POST /api/usuarios/login
exports.loginUsuario = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'Error', message: 'Email y contraseña son obligatorios' });
  }
  const resultado = await usuarioService.autenticar(email, password);
  if (!resultado) return res.status(401).json({ status: 'Error', message: 'Credenciales inválidas' });
  res.json({ status: 'OK', ...resultado });
});

// 9. GET /api/usuarios
exports.listarUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await usuarioService.listar();
  res.json({ status: 'OK', total: usuarios.length, data: usuarios });
});
