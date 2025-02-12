const pool = require('../config/database');

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      photo TEXT,
      user_type VARCHAR(20) CHECK (user_type IN ('comprador', 'vendedor')) NOT NULL,
      dni VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

module.exports = {
  createTables,
};