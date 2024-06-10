const express = require('express');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/users', authMiddleware, userController.createUser);

module.exports = router;
