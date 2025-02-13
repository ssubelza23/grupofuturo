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
    // Convertir password y email a null si están vacíos
    const password = userData.password && userData.password.trim() !== '' ? userData.password : null;
    const email = userData.email && userData.email.trim() !== '' ? userData.email : null;

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 8);
    }

    const newUser = await User.create({ ...userData, password: hashedPassword, email });
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
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getAuthenticatedUser
};