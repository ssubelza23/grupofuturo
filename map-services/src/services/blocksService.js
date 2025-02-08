const Block = require('../models/blocksModel');

const getAllBlocks = async () => {
  try {
    const blocks = await Block.getAll();
    return blocks;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getBlockById = async (id) => {
  try {
    const block = await Block.getById(id);
    if (!block) {
      throw new Error('Block not found');
    }
    return block;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createBlock = async (blockData) => {
  try {
    const newBlock = await Block.create(blockData);
    return newBlock;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateBlock = async (id, blockData) => {
  try {
    const updatedBlock = await Block.update(id, blockData);
    return updatedBlock;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteBlock = async (id) => {
  try {
    await Block.delete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllBlocks,
  getBlockById,
  createBlock,
  updateBlock,
  deleteBlock
};