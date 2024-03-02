const express = require('express');
const router = express.Router();
const InventoryController = require('./inventory.controller');

router.get('/', InventoryController.getInventory);

module.exports = router;