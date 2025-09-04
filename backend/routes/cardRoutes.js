const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/', cardController.getCards);
router.get('/get/card-collection', cardController.getCardCollection);
router.post('/', cardController.createCard);
router.put('/:id', cardController.updateCard); 
module.exports = router;
