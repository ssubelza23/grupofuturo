const Street = require('../models/streetsModel');

const getAllStreets = async (req, res) => {
  try {
    const streets = await Street.getAll();
    res.json(streets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStreets
};