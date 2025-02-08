const lotsService = require('../services/lotsService');

const getAllLots = async (req, res) => {
  try {
    const lots = await lotsService.getAllLots();
    res.status(200).json(lots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLotById = async (req, res) => {
  const { id } = req.params;
  try {
    const lot = await lotsService.getLotById(id);
    res.status(200).json(lot);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createLot = async (req, res) => {
  const lotData = req.body;
  try {
    const newLot = await lotsService.createLot(lotData);
    res.status(201).json(newLot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLot = async (req, res) => {
  const { id } = req.params;
  const lotData = req.body;
  try {
    const updatedLot = await lotsService.updateLot(id, lotData);
    res.status(200).json(updatedLot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLot = async (req, res) => {
  const { id } = req.params;
  try {
    await lotsService.deleteLot(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
};