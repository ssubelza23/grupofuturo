require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createTables } = require('./models/usersModel');
const userRoutes = require('./routes/usersRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para aceptar conexiones desde localhost y tu dominio
const allowedOrigins = ['http://localhost:3001', 'http://www.grupofuturo.com.ar', 'http://grupofuturo.com.ar', 'https://grupofuturo.com.ar'];
app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como las de Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política CORS no permite el acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
}));

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('API is running');
});

// Crear tablas y arrancar el servidor
createTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error creating tables:', err);
});