const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, usersController.getAllUsers);
router.get('/:id', authenticate, usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', authenticate, usersController.updateUser);
router.delete('/:id', authenticate, usersController.deleteUser);
router.post('/login', usersController.loginUser);
router.get('/me', authenticate, usersController.getAuthenticatedUser);

module.exports = router;