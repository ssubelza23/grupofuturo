const pool = require('../config/database');

const getAllLots = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.id, l.name, l.status, l.surface, l.discount, l.initial_payment, l.number_of_installments, l.monto_financiado, l.cuota_mensual, l.price, l.reserved_until, l.reserved_by, l.reserved_for, l.description, l.block_id, ST_AsGeoJSON(l.coordinates) as coordinates, b.name as block_name, p.name as project_name
      FROM public.lots l
      JOIN public.blocks b ON l.block_id = b.id
      JOIN public.projects p ON b.project_id = p.id
    `);
    const lots = result.rows.map(lot => {
      const coordinates = JSON.parse(lot.coordinates);
      return {
        ...lot,
        coordinates: coordinates.coordinates, // Mantener las coordenadas en formato GeoJSON
        block_name: lot.block_name,
        project_name: lot.project_name
      };
    });
    res.status(200).json(lots);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching lots: ' + error.message });
  }
};

const getLotById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT l.id, l.name, l.status, l.surface, l.discount, l.initial_payment, l.number_of_installments, l.monto_financiado, l.cuota_mensual, l.price, l.reserved_until, l.reserved_by, l.reserved_for, l.description, l.block_id, ST_AsGeoJSON(l.coordinates) as coordinates, b.name as block_name, p.name as project_name
      FROM public.lots l
      JOIN public.blocks b ON l.block_id = b.id
      JOIN public.projects p ON b.project_id = p.id
      WHERE l.id = $1
    `, [id]);
    if (result.rows.length > 0) {
      const lot = result.rows[0];
      lot.coordinates = JSON.parse(lot.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON
      lot.block_name = result.rows[0].block_name;
      lot.project_name = result.rows[0].project_name;
      res.status(200).json(lot);
    } else {
      res.status(404).json({ error: 'Lot not found' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Error fetching lot: ' + error.message });
  }
};

const createLot = async (req, res) => {
  const { name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.lots (name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
      [name, JSON.stringify({ type: 'Polygon', coordinates }), status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id]
    );
    const lot = result.rows[0];
    lot.coordinates = JSON.parse(lot.coordinates).coordinates; // Mantener las coordenadas en formato GeoJSON

    // Obtener el nombre del bloque y del proyecto
    const blockResult = await pool.query('SELECT b.name as block_name, p.name as project_name FROM public.blocks b JOIN public.projects p ON b.project_id = p.id WHERE b.id = $1', [block_id]);
    if (blockResult.rows.length > 0) {
      lot.block_name = blockResult.rows[0].block_name;
      lot.project_name = blockResult.rows[0].project_name;
    }

    res.status(201).json(lot);
  } catch (error) {
    res.status(500).json({ error: 'Error creating lot: ' + error.message });
  }
};

const updateLot = async (req, res) => {
  const { id } = req.params;
  const { name,price,reserved_by,reserved_for,status,surface } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.lots SET name = $1, price = $2,reserved_by = $3, reserved_for = $4, status = $5, surface = $6 WHERE id = $7 RETURNING *',
      [name,price,reserved_by,reserved_for,status,surface, id]
    );
    const lot = result.rows[0];
    // Obtener el nombre del bloque y del proyecto
    res.status(200).json(lot);
  } catch (error) {
    res.status(500).json({ error: 'Error updating lot: ' + error.message });
  }
};

const deleteLot = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM public.lots WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting lot: ' + error.message });
  }
};

module.exports = {
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
};