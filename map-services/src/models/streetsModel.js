const db = require('../config/database');

const Street = {
  getAll: async () => {
    try {
      const result = await db.any(`
        SELECT id, name, ST_AsGeoJSON(coordinates) as coordinates 
        FROM streets
      `);
      return result.map(street => {
        return {
          ...street,
          geom: JSON.parse(street.coordinates)
        };
      });
    } catch (error) {
      throw new Error('Error fetching streets: ' + error.message);
    }
  },
};

module.exports = Street;