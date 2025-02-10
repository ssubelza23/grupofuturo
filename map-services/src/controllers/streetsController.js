const pool = require('../config/database');

const getAllStreets = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.streets');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching streets: ' + error.message });
  }
};

module.exports = {
  getAllStreets
};