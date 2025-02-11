const db = require('../config/database');

const Project = {
  getAll: async () => {
    const result = await pool.query('SELECT id, name,location, ST_AsGeoJSON(coordinates) as coordinates, photos, description FROM public.projects');
    return result.rows.map(project => {
      const coordinates = JSON.parse(project.coordinates);
      return {
        ...project,
        coordinates: {
          lat: coordinates.coordinates[1],
          lng: coordinates.coordinates[0]
        }
      };
    });
  },
 
  getById: async (id) => {
    try {
      const result = await db.oneOrNone('SELECT * FROM public.projects WHERE id = $1', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  create: async (projectData) => {
    const { name, location, coordinates, photos, description } = projectData;
    try {
      const result = await db.one(
        'INSERT INTO public.projects (name, location, coordinates, photos, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, location, coordinates, photos, description]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, projectData) => {
    const { name, location, coordinates, photos, description } = projectData;
    try {
      const result = await db.one(
        'UPDATE public.projects SET name = $1, location = $2, coordinates = $3, photos = $4, description = $5 WHERE id = $6 RETURNING *',
        [name, location, coordinates, photos, description, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.none('DELETE FROM public.projects WHERE id = $1', [id]);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Project;