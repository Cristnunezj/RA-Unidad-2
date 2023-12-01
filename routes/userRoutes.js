// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.put('/:username', UserController.updateUser);
router.delete('/:username', UserController.deleteUser);
router.patch('/:username', UserController.updateUser);

module.exports = router;
