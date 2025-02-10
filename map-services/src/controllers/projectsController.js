const pool = require('../config/database');

const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.projects');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects: ' + error.message });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM public.projects WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: 'Error fetching project: ' + error.message });
  }
};

const createProject = async (req, res) => {
  const { name, location, coordinates, photos, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.projects (name, location, coordinates, photos, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, location, coordinates, photos, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project: ' + error.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, location, coordinates, photos, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.projects SET name = $1, location = $2, coordinates = $3, photos = $4, description = $5 WHERE id = $6 RETURNING *',
      [name, location, coordinates, photos, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project: ' + error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM public.projects WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project: ' + error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};