const express = require('express');
const addressController = require('../controllers/address-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/addresses', authMiddleware, addressController.createAddresses);

module.exports = router;
