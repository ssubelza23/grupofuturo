const db = require('../config/database');

const Block = {
  getAll: async () => {
    try {
      const result = await db.any(`
        SELECT id, name, ST_AsGeoJSON(ST_Transform(coordinates, 4326)) as coordinates, description
        FROM public.blocks
      `);
      return result.map(block => {
        const coordinates = JSON.parse(block.coordinates);
        return {
          ...block,
          coordinates: coordinates.coordinates
        };
      });
    } catch (error) {
      throw new Error('Error fetching blocks: ' + error.message);
    }
  },

  getById: async (id) => {
    try {
      const result = await db.oneOrNone('SELECT * FROM public.blocks WHERE id = $1', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  create: async (blockData) => {
    const { project_id, name, coordinates, description } = blockData;
    try {
      const result = await db.one(
        'INSERT INTO public.blocks (project_id, name, coordinates, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [project_id, name, coordinates, description]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, blockData) => {
    const { project_id, name, coordinates, description } = blockData;
    try {
      const result = await db.one(
        'UPDATE public.blocks SET project_id = $1, name = $2, coordinates = $3, description = $4 WHERE id = $5 RETURNING *',
        [project_id, name, coordinates, description, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.none('DELETE FROM public.blocks WHERE id = $1', [id]);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Block;