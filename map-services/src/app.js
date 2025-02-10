require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const projectsRoutes = require('./routes/projectsRoutes');
const blocksRoutes = require('./routes/blocksRoutes');
const lotsRoutes = require('./routes/lotsRoutes');
const streetsRoutes = require('./routes/streetsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

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

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas de la API
app.use('/api/projects', projectsRoutes);
app.use('/api/blocks', blocksRoutes);
app.use('/api/lots', lotsRoutes);
app.use('/api/streets', streetsRoutes);
app.use('/api/upload', uploadRoutes);  // Usar '/api/upload' para las solicitudes de carga

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('API is running');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;