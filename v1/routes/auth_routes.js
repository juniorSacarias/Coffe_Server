const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth_controllers');

router.post('/login', authController.login);
router.post('/register', authController.registerUser);

module.exports = router;
