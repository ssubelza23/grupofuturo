const express = require('express');
const router = express.Router();
const lotsController = require('../controllers/lotsController');

router.get('/', lotsController.getAllLots);
router.get('/:id', lotsController.getLotById);
router.post('/', lotsController.createLot);
router.put('/:id', lotsController.updateLot);
router.delete('/:id', lotsController.deleteLot);

module.exports = router;