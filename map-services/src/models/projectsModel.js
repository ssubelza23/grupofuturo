const db = require('../config/database');

const Project = {
  getAll: async () => {
    try {
      const result = await db.any(`
        SELECT id, name, ST_AsGeoJSON(ST_Transform(coordinates, 4326)) as coordinates, photos, description
        FROM public.projects
      `);
      return result.map(project => {
        const coordinates = JSON.parse(project.coordinates);
        return {
          ...project,
          coordinates: coordinates.coordinates
        };
      });
    } catch (error) {
      throw new Error('Error fetching projects: ' + error.message);
    }
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