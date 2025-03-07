const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../config/database'); // Asegúrate de que la ruta sea correcta
require('dotenv').config();

const router = express.Router();

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};


// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  try {
    const { username, first_name, last_name, email, password, phone, photo, user_type, dni } = req.body;

    // Verificar si el correo electrónico ya existe si no es nulo o vacío
    if (email && email.trim() !== '') {
      const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
      const { rows: emailRows } = await pool.query(emailCheckQuery, [email]);
      if (emailRows.length > 0) {
        return res.status(400).send({ message: 'El correo electrónico ya está en uso.' });
      }
    }

    // Hacer hash de la contraseña si no es nula o vacía
    let hashedPassword = null;
    if (password && password.trim() !== '') {
      hashedPassword = await bcrypt.hash(password, 8);
    }

    const query = `
      INSERT INTO users (username, first_name, last_name, email, password, phone, photo, user_type, dni)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [username, first_name, last_name, email, hashedPassword, phone, photo, user_type, dni];
    const { rows } = await pool.query(query, values);
    res.status(201).send(rows[0]);
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(400).send(e);
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    const user = rows[0];
    if (!user) {
      return res.status(400).send({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token, user });
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(400).send(e);
  }
});

// Ruta para obtener los datos del usuario autenticado
router.get('/me', authenticate, async (req, res) => {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [req.user.id]);
    const user = rows[0];
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send(user); // Enviar los datos completos del usuario
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

// Ruta para actualizar un usuario
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 8);
  }

  try {
    const query = `
      UPDATE users
      SET username = $1, first_name = $2, last_name = $3, email = $4, password = $5, phone = $6, photo = $7, user_type = $8, dni = $9
      WHERE id = $10
      RETURNING *;
    `;
    const values = [updates.username, updates.first_name, updates.last_name, updates.email, updates.password, updates.phone, updates.photo, updates.user_type, updates.dni, id];
    const { rows } = await pool.query(query, values);
    const user = rows[0];
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(400).send(e);
  }
});

// Ruta para eliminar un usuario
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    const user = rows[0];
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(400).send(e);
  }
});

// Ruta para obtener todos los usuarios
router.get('/', authenticate, async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);
    res.status(200).send(rows);
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(500).send(e);
  }
});

// Ruta para recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(userQuery, [email]);
    const user = rows[0];
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Generar un token JWT de recuperación
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar el correo electrónico
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${process.env.FRONTEND_URL}/reset-password/${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'Password reset email sent' });
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(400).send({ error: e.message });
  }
});
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 8);
    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *';
    const values = [hashedPassword, decoded.id];
    const { rows } = await pool.query(query, values);
    const user = rows[0];
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ message: 'Password reset successfully' });
  } catch (e) {
    console.error(e); // Agrega esta línea para registrar el error
    res.status(400).send({ error: 'Invalid or expired token' });
  }
});
module.exports = router;