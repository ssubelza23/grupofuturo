const pool = require('../config/database');

const getAllLots = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.lots');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching lots: ' + error.message });
  }
};

const getLotById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM public.lots WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: 'Error fetching lot: ' + error.message });
  }
};

const createLot = async (req, res) => {
  const { name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.lots (name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
      [name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error creating lot: ' + error.message });
  }
};

const updateLot = async (req, res) => {
  const { id } = req.params;
  const { name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE public.lots SET name = $1, coordinates = $2, status = $3, surface = $4, discount = $5, initial_payment = $6, number_of_installments = $7, monto_financiado = $8, cuota_mensual = $9, price = $10, reserved_until = $11, reserved_by = $12, reserved_for = $13, description = $14, block_id = $15 WHERE id = $16 RETURNING *',
      [name, coordinates, status, surface, discount, initial_payment, number_of_installments, monto_financiado, cuota_mensual, price, reserved_until, reserved_by, reserved_for, description, block_id, id]
    );
    res.status(200).json(result.rows[0]);
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