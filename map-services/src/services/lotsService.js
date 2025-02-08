const Lot = require('../models/lotsModel');

const getAllLots = async () => {
  try {
    const lots = await Lot.getAll();
    return lots;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLotById = async (id) => {
  try {
    const lot = await Lot.getById(id);
    if (!lot) {
      throw new Error('Lot not found');
    }
    return lot;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createLot = async (lotData) => {
  try {
    const newLot = await Lot.create(lotData);
    return newLot;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateLot = async (id, lotData) => {
  try {
    const updatedLot = await Lot.update(id, lotData);
    return updatedLot;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteLot = async (id) => {
  try {
    await Lot.delete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
};