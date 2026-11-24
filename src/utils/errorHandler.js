// 404 para rutas que no existen
exports.noEncontrado = (req, res) => {
  res.status(404).json({ status: 'Error', message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// Manejador central de errores
exports.manejarErrores = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errores = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ status: 'Error', message: 'Datos inválidos', errores });
  }
  if (err.code === 11000) {
    return res.status(409).json({ status: 'Error', message: 'Ya existe un registro con ese valor único (por ejemplo, el email)' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'Error', message: 'El JSON enviado está mal formado' });
  }
  console.error(err);
  res.status(500).json({ status: 'Error', message: 'Error interno del servidor' });
};
