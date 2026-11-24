const jwt = require('jsonwebtoken');

module.exports = (usuario) =>
  jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET || 'clave_de_desarrollo',
    { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
  );
