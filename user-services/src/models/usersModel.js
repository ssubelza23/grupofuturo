const pool = require('../config/database');

const User = {
  getAll: async () => {
    try {
      const result = await pool.query('SELECT * FROM public.users');
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  },

  getById: async (id) => {
    try {
      const result = await pool.query('SELECT * FROM public.users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  getByEmail: async (email) => {
    try {
      const result = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  create: async (userData) => {
    const { username, first_name, last_name, email, password, phone, photo, user_type, dni } = userData;
    try {
      const result = await pool.query(
        'INSERT INTO public.users (username, first_name, last_name, email, password, phone, photo, user_type, dni) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [username, first_name, last_name, email, password, phone, photo, user_type, dni]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  update: async (id, userData) => {
    const { username, first_name, last_name, email, password, phone, photo, user_type, dni } = userData;
    try {
      const result = await pool.query(
        'UPDATE public.users SET username = $1, first_name = $2, last_name = $3, email = $4, password = $5, phone = $6, photo = $7, user_type = $8, dni = $9 WHERE id = $10 RETURNING *',
        [username, first_name, last_name, email, password, phone, photo, user_type, dni, id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM public.users WHERE id = $1', [id]);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;