const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: [true, 'Ingredient name is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
    },
    unit: {
        type: String,
        required: [true, 'Unit is required'],
        trim: true,
    },
    costPerUnit: {
        type: Number,
        required: [true, 'Cost per unit is required'],
        min: [0, 'Cost per unit cannot be negative'],
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);
