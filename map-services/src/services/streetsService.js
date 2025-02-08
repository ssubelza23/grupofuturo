const Street = require('../models/streetsModel');

const getAllStreets = async () => {
  try {
    const streets = await Street.getAll();
    return streets;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllStreets
};