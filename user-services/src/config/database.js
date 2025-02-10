const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER_DB_USER, 
  host: process.env.USER_DB_HOST || 'db_user', 
  database: process.env.USER_DB_NAME, 
  password: process.env.USER_DB_PASSWORD, 
  port: process.env.USER_DB_PORT || 5432,
});

module.exports = pool;