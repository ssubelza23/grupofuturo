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
const allowedOrigins = [
  "http://localhost:3001",
  "https://www.grupofuturo.com.ar",
  "http://www.grupofuturo.com.ar"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy does not allow this origin."), false);
    }
  },
  credentials: true, // Importante para autenticación con cookies/tokens
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
};

app.use(cors(corsOptions));

// Crear tablas y arrancar el servidor
createTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al crear las tablas:', err);
});