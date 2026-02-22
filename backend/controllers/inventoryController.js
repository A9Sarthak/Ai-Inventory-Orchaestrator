const fs = require('fs');
const csv = require('csv-parser');
const Inventory = require('../models/Inventory');

// ---------- helpers ----------

/**
 * Validate a single CSV row.
 * Returns the cleaned object if valid, or null if invalid.
 */
const validateRow = (row) => {
    const ingredientName = (row.ingredientName || '').trim();
    const unit = (row.unit || '').trim();
    const quantity = Number(row.quantity);
    const costPerUnit = Number(row.costPerUnit);
    const expiryDate = new Date(row.expiryDate);

    // All fields must be present and valid
    if (!ingredientName) return null;
    if (!unit) return null;
    if (isNaN(quantity) || quantity < 0) return null;
    if (isNaN(costPerUnit) || costPerUnit < 0) return null;
    if (isNaN(expiryDate.getTime())) return null;

    return { ingredientName, quantity, unit, costPerUnit, expiryDate };
};

// ---------- controllers ----------

// @desc    Upload CSV and insert inventory items
// @route   POST /api/inventory/upload-csv
const uploadCSV = (req, res) => {
    // Make sure a file was actually uploaded
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'Please upload a CSV file',
        });
    }

    const results = [];   // valid rows
    const filePath = req.file.path;
    let totalRows = 0;

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            totalRows++;
            const validated = validateRow(row);
            if (validated) results.push(validated);
        })
        .on('end', async () => {
            try {
                // Insert all valid rows at once
                let insertedCount = 0;
                if (results.length > 0) {
                    const inserted = await Inventory.insertMany(results);
                    insertedCount = inserted.length;
                }

                // Clean up the uploaded file
                fs.unlink(filePath, () => { });

                res.status(201).json({
                    success: true,
                    totalRows,
                    insertedCount,
                    skippedCount: totalRows - insertedCount,
                });
            } catch (error) {
                // Clean up on error too
                fs.unlink(filePath, () => { });

                res.status(500).json({
                    success: false,
                    error: 'Failed to insert inventory items',
                });
            }
        })
        .on('error', (error) => {
            // Clean up on stream error
            fs.unlink(filePath, () => { });

            res.status(500).json({
                success: false,
                error: 'Failed to parse CSV file',
            });
        });
};

// @desc    Get all inventory items
// @route   GET /api/inventory
const getInventory = async (req, res) => {
    try {
        const items = await Inventory.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

module.exports = { uploadCSV, getInventory };
