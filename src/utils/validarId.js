const mongoose = require('mongoose');

// Evita que un :id mal formado llegue a Mongoose (respondemos 400 en vez de 500)
module.exports = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ status: 'Error', message: 'El ID enviado no es válido' });
  }
  next();
};
