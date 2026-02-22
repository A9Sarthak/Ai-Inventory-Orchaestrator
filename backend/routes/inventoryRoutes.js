const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadCSV, getInventory } = require('../controllers/inventoryController');

// Configure multer — store uploads in the "uploads/" folder
const upload = multer({
    dest: 'uploads/',
    fileFilter: (_req, file, cb) => {
        // Only allow CSV files
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'), false);
        }
    },
});

// POST /api/inventory/upload-csv — Upload & process CSV
router.post('/upload-csv', upload.single('file'), uploadCSV);

// GET /api/inventory — Get all inventory items
router.get('/', getInventory);

module.exports = router;
