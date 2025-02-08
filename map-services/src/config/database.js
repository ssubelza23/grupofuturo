const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  host: process.env.MAP_DB_HOST,
  port: process.env.MAP_DB_PORT,
  database: process.env.MAP_DB_NAME,
  user: process.env.MAP_DB_USER,
  password: process.env.MAP_DB_PASSWORD,
});

module.exports = db;