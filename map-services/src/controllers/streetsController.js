const pool = require('../config/database');

const getAllStreets = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.name, ST_AsGeoJSON(s.coordinates) as coordinates, p.name as project_name
      FROM public.streets s
      JOIN public.projects p ON s.project_id = p.id
    `);
    const streets = result.rows.map(street => {
      const coordinates = JSON.parse(street.coordinates);
      return {
        ...street,
        coordinates: coordinates.coordinates, // Mantener las coordenadas en formato GeoJSON
        project_name: street.project_name
      };
    });
    res.status(200).json(streets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching streets: ' + error.message });
  }
};





module.exports = {
  getAllStreets
};