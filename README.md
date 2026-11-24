## Guia 7



## Instalación y ejecución
npm install
copy .env.example .env      
npm run dev  

Salida esperada:

Conexión exitosa a la base de datos MongoDB
Servidor escuchando en http://localhost:3000


## Estructura

src/
├── app.js          -> configura Express, rutas y arranca el servidor
├── data/           -> conexión a la base de datos (db.js)
├── models/         -> esquemas Mongoose (Producto, Usuario)
├── routes/         -> URL -> controlador
├── controllers/    -> reciben req / envían res (HTTP)
├── services/       -> lógica de negocio y consultas a la BD
└── utils/          -> validarId, manejo de errores, asyncHandler, generarToken

Flujo de una petición: `routes → controllers → services → models → MongoDB`.

## Endpoints
| # | Método | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | POST | /api/productos | Crear producto |
| 2 | GET | /api/productos | Listar productos |
| 3 | GET | /api/productos/:id | Producto por ID |
| 4 | PUT | /api/productos/:id | Actualización total |
| 5 | DELETE | /api/productos/:id | Eliminar producto |
| 6 | GET | /api/productos/categoria/:cat | Filtrar por categoría |
| 7 | POST | /api/usuarios/registro | Registrar usuario (contraseña con bcrypt) |
| 8 | POST | /api/usuarios/login | Login (devuelve JWT) |
| 9 | GET | /api/usuarios | Listar usuarios (sin contraseña) |
| 10 | GET | /api/reportes/estadisticas | Estadísticas con `aggregate` |

