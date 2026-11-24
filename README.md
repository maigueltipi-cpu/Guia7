# Taller Backend Modular – Express + MongoDB (Mongoose)
SENA · ADSO 228118 · Guía 7 / Clase 9 · RAP 220501096-03

API REST en Node.js + Express con arquitectura en capas y 10 endpoints conectados a MongoDB.

## Requisitos
- Node.js 18 o superior
- MongoDB local (`mongodb://127.0.0.1:27017`) o MongoDB Atlas

## Instalación y ejecución
```bash
npm install
copy .env.example .env      # en Mac/Linux: cp .env.example .env
npm run dev                 # o: npm start
```
Salida esperada:
```
✅ Conexión exitosa a la base de datos MongoDB
🚀 Servidor escuchando en http://localhost:3000
```

## Estructura
```
src/
├── app.js          -> configura Express, rutas y arranca el servidor
├── data/           -> conexión a la base de datos (db.js)
├── models/         -> esquemas Mongoose (Producto, Usuario)
├── routes/         -> URL -> controlador
├── controllers/    -> reciben req / envían res (HTTP)
├── services/       -> lógica de negocio y consultas a la BD
└── utils/          -> validarId, manejo de errores, asyncHandler, generarToken
```
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

## Pruebas
Importar `Taller-Backend-Modular.postman_collection.json` (en la raíz) en Postman o Thunder Client y ejecutarla en orden con el Runner.

## Reflexión inicial (3.1)
**1. RAM / JSON local vs. motor de base de datos.** En RAM los datos se pierden al reiniciar el servidor; un JSON local no maneja bien la concurrencia, no tiene índices ni validaciones ni control de acceso. Un motor como MongoDB o MySQL ofrece persistencia, consultas eficientes, concurrencia y escalabilidad.

**2. Migrar de Python a Node.js + Express con esquemas JSON/BSON.** Node usa un modelo asíncrono no bloqueante, ideal para APIs con mucha entrada/salida. JSON es el formato nativo de JavaScript, de MongoDB (BSON) y del frontend, por lo que casi no hay conversión de datos entre capas. Los esquemas flexibles permiten evolucionar el modelo sin migraciones rígidas, y Mongoose conserva la validación.
