const db = require('../config/database');

const Lot = {
  getAll: async () => {
    try {
      const result = await db.any(`
        SELECT 
          l.id, 
          l.name, 
          ST_AsGeoJSON(ST_Transform(l.coordinates, 4326)) as coordinates, 
          l.status, 
          l.surface, 
          l.price, 
          l.description,
          l.reserved_by,
          l.reserved_for,
          b.name as block_name,
          p.name as project_name
        FROM 
          public.lots l
        JOIN 
          public.blocks b ON l.block_id = b.id
        JOIN 
          public.projects p ON b.project_id = p.id
      `);
      return result.map(lot => {
        const coordinates = lot.coordinates ? JSON.parse(lot.coordinates) : { coordinates: [] };
        return {
          ...lot,
          coordinates: coordinates.coordinates
        };
      });
    } catch (error) {
      throw new Error('Error fetching lots: ' + error.message);
    }
  },

  getById: async (id) => {
    try {
      const result = await db.oneOrNone('SELECT * FROM public.lots WHERE id = $1', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  create: async (lotData) => {
    const { block_id, name, coordinates, status, surface, price, description } = lotData;
    try {
      const result = await db.one(
        'INSERT INTO public.lots (block_id, name, coordinates, status, surface, price, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [block_id, name, coordinates, status, surface, price, description]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, lotData) => {
    const { name, price, surface, status, reserved_by, reserved_for } = lotData;
    try {
      const result = await db.one(
        'UPDATE public.lots SET name = $1, price = $2, surface = $3, status = $4, reserved_by = $5, reserved_for = $6 WHERE id = $7 RETURNING *',
        [name, price, surface, status, reserved_by, reserved_for, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await db.none('DELETE FROM public.lots WHERE id = $1', [id]);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Lot;