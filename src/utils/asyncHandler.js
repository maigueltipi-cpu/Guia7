// Envuelve un controlador async: si lanza un error, lo manda al manejador central (next)
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
