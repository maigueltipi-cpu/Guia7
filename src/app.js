require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBD = require('./data/db');
const { noEncontrado, manejarErrores } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'OK', message: 'API Taller Backend Modular - Express + MongoDB funcionando' }));

app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/reportes', require('./routes/reporteRoutes'));

app.use(noEncontrado);
app.use(manejarErrores);

module.exports = app;

// Solo arranca el servidor si se ejecuta directamente (node src/app.js)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  // Primero conectamos a la BD y SOLO si conecta levantamos el servidor
  conectarBD().then(() => {
    app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));
  });
}
