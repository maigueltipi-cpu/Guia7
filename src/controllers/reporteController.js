const reporteService = require('../services/reporteService');
const asyncHandler = require('../utils/asyncHandler');

// 10. GET /api/reportes/estadisticas
exports.obtenerEstadisticas = asyncHandler(async (req, res) => {
  const datos = await reporteService.estadisticas();
  res.json({ status: 'OK', ...datos });
});
