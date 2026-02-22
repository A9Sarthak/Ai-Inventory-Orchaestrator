const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Dish name is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        trim: true,
        default: 'General',
    },
    available: {
        type: Boolean,
        default: true,
    },
    ingredients: [
        {
            ingredient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Inventory',
            },
            quantityRequired: {
                type: Number,
                required: true,
                min: [0, 'Quantity required cannot be negative'],
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Dish', dishSchema);
