const pool = require('../config/database');

const getAllBlocks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.blocks');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blocks: ' + error.message });
  }
};

const getBlockById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM public.blocks WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: 'Error fetching block: ' + error.message });
  }
};

const createBlock = async (req, res) => {
  const { project_id, name, coordinates, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.blocks (project_id, name, coordinates, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [project_id, name, coordinates, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating block: ' + error.message });
  }
};

const updateBlock = async (req, res) => {
  const { id } = req.params;
  const { project_id, name, coordinates, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.blocks SET project_id = $1, name = $2, coordinates = $3, description = $4 WHERE id = $5 RETURNING *',
      [project_id, name, coordinates, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating block: ' + error.message });
  }
};

const deleteBlock = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM public.blocks WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting block: ' + error.message });
  }
};

module.exports = {
  getAllBlocks,
  getBlockById,
  createBlock,
  updateBlock,
  deleteBlock
};