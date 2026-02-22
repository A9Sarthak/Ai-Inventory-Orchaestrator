const express = require('express');
const router = express.Router();
const { addDish, getDishes } = require('../controllers/dishController');

// POST /api/dishes — Add a new dish
router.post('/', addDish);

// GET /api/dishes — Get all dishes
router.get('/', getDishes);

module.exports = router;
