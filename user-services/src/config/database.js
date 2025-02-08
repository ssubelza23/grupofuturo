const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER_DB_USER,
  host: process.env.USER_DB_HOST, // Utiliza la variable de entorno POSTGRES_HOST
  database: process.env.USER_DB_NAME,
  password: process.env.USER_DB_PASSWORD, 
  port: 5432,
});

module.exports = pool;