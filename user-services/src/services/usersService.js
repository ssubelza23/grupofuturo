const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
require('dotenv').config();

const getAllUsers = async () => {
  try {
    const users = await User.getAll();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const newUser = await User.create({ ...userData, password: hashedPassword });
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 8);
    }
    const updatedUser = await User.update(id, userData);
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async (id) => {
  try {
    await User.delete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '144h' });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAuthenticatedUser = async (id) => {
  try {
    const user = await User.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const forgotPassword = async (email) => {
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      throw new Error('User not found');
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
             http://${process.env.FRONTEND_URL}/reset-password/${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    return { message: 'Password reset email sent' };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAuthenticatedUser,
  forgotPassword
};