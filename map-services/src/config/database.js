const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.MAP_DB_USER, 
  host: process.env.MAP_DB_HOST || 'db_map', 
  database: process.env.MAP_DB_NAME, 
  password: process.env.MAP_DB_PASSWORD, 
  port: process.env.MAP_DB_PORT || 5432,
});

module.exports = pool;