const pool = require('../config/database');

const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, location, ST_AsGeoJSON(coordinates) as coordinates, photos, description FROM public.projects');
    const projects = result.rows.map(project => {
      const coordinates = JSON.parse(project.coordinates);
      return {
        ...project,
        coordinates: coordinates.coordinates // Mantener las coordenadas en formato GeoJSON
      };
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects: ' + error.message });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, name, location, ST_AsGeoJSON(coordinates) as coordinates, photos, description FROM public.projects WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      const project = result.rows[0];
      project.coordinates = JSON.parse(project.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Error fetching project: ' + error.message });
  }
};

const createProject = async (req, res) => {
  const { name, location, coordinates, photos, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.projects (name, location, coordinates, photos, description) VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326), $4, $5) RETURNING *',
      [name, location, JSON.stringify({ type: 'Point', coordinates }), photos, description]
    );
    const project = result.rows[0];
    project.coordinates = JSON.parse(project.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project: ' + error.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, location, coordinates, photos, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.projects SET name = $1, location = $2, coordinates = ST_SetSRID(ST_GeomFromGeoJSON($3), 4326), photos = $4, description = $5 WHERE id = $6 RETURNING *',
      [name, location, JSON.stringify({ type: 'Point', coordinates }), photos, description, id]
    );
    const project = result.rows[0];
    project.coordinates = JSON.parse(project.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
    res.status(200).json(project);
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