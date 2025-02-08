const blocksService = require('../services/blocksService');

const getAllBlocks = async (req, res) => {
  try {
    const blocks = await blocksService.getAllBlocks();
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlockById = async (req, res) => {
  const { id } = req.params;
  try {
    const block = await blocksService.getBlockById(id);
    res.status(200).json(block);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createBlock = async (req, res) => {
  const blockData = req.body;
  try {
    const newBlock = await blocksService.createBlock(blockData);
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBlock = async (req, res) => {
  const { id } = req.params;
  const blockData = req.body;
  try {
    const updatedBlock = await blocksService.updateBlock(id, blockData);
    res.status(200).json(updatedBlock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlock = async (req, res) => {
  const { id } = req.params;
  try {
    await blocksService.deleteBlock(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBlocks,
  getBlockById,
  createBlock,
  updateBlock,
  deleteBlock
};