require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar el paquete cors
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createTables } = require('./models/User'); // Asegúrate de que la ruta sea correcta
const pool = require('./config/database'); // Asegúrate de que esta ruta es correcta

const app = express();

const PORT = process.env.PORT || 3000;

// Configurar CORS para aceptar conexiones desde localhost y tu dominio
// Middleware
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen
  optionsSuccessStatus: 200 // Algunas versiones de navegadores antiguos (IE11, varios SmartTVs) no manejan bien el status 204
};

app.use(cors(corsOptions)); // Usar el middleware cors con opciones

app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuario

app.use('/api/users', userRoutes); // Usar las rutas de usuario

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('API is running');
});

// Crear tablas y arrancar el servidor
createTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al crear las tablas:', err);
});