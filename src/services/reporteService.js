const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

exports.estadisticas = async () => {
  const [porCategoria, resumen, totalUsuarios] = await Promise.all([
    Producto.aggregate([
      {
        $group: {
          _id: '$categoria',
          totalProductos: { $sum: 1 },
          precioPromedio: { $avg: '$precio' },
          stockTotal: { $sum: '$stock' }
        }
      },
      { $sort: { totalProductos: -1 } }
    ]),
    Producto.aggregate([
      {
        $group: {
          _id: null,
          totalProductos: { $sum: 1 },
          valorInventario: { $sum: { $multiply: ['$precio', '$stock'] } }
        }
      }
    ]),
    Usuario.countDocuments()
  ]);

  return {
    resumen: {
      totalProductos: resumen[0]?.totalProductos || 0,
      valorInventario: resumen[0]?.valorInventario || 0,
      totalUsuarios
    },
    porCategoria
  };
};
