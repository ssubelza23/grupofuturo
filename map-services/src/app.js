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

const corsOptions = {
  origin: ['http://localhost:3000', 'https://www.grupofuturo.com.ar'], // Permitir solo estos orígenes
  credentials: true, // Permitir credenciales (cookies, autenticación)
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



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