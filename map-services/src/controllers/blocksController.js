const pool = require('../config/database');

const getAllBlocks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.id, b.name, b.description, b.project_id, ST_AsGeoJSON(b.coordinates) as coordinates
      , p.name as project_name
      FROM public.blocks b
      JOIN public.projects p ON b.project_id = p.id
    `);
    const blocks = result.rows.map(block => {
      const coordinates = JSON.parse(block.coordinates);
      return {
        ...block,
        coordinates: coordinates.coordinates // Mantener las coordenadas en formato GeoJSON
      };
    });
    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blocks: ' + error.message });
  }
};

const getBlockById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT b.id, b.name, b.description, b.project_id, ST_AsGeoJSON(b.coordinates) as coordinates, p.name as project_name
      FROM public.blocks b
      JOIN public.projects p ON b.project_id = p.id
      WHERE b.id = $1
    `, [id]);
    if (result.rows.length > 0) {
      const block = result.rows[0];
      block.coordinates = JSON.parse(block.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
      res.status(200).json(block);
    } else {
      res.status(404).json({ error: 'Block not found' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Error fetching block: ' + error.message });
  }
};

const createBlock = async (req, res) => {
  const { project_id, name, coordinates, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.blocks (project_id, name, coordinates, description) VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326), $4) RETURNING *',
      [project_id, name, JSON.stringify({ type: 'Polygon', coordinates }), description]
    );
    const block = result.rows[0];
    block.coordinates = JSON.parse(block.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
    res.status(201).json(block);
  } catch (error) {
    res.status(500).json({ error: 'Error creating block: ' + error.message });
  }
};

const updateBlock = async (req, res) => {
  const { id } = req.params;
  const { project_id, name, coordinates, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.blocks SET project_id = $1, name = $2, coordinates = ST_SetSRID(ST_GeomFromGeoJSON($3), 4326), description = $4 WHERE id = $5 RETURNING *',
      [project_id, name, JSON.stringify({ type: 'Polygon', coordinates }), description, id]
    );
    const block = result.rows[0];
    block.coordinates = JSON.parse(block.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
    res.status(200).json(block);
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