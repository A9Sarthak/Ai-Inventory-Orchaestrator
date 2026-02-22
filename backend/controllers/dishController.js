const Dish = require('../models/Dish');
const Inventory = require('../models/Inventory');

// @desc    Add a new dish
// @route   POST /api/dishes
const addDish = async (req, res) => {
    try {
        const { name, price, category, available, ingredients } = req.body;

        // If ingredients are provided, validate that each ID exists in Inventory
        if (ingredients && ingredients.length > 0) {
            const ingredientIds = ingredients.map((item) => item.ingredient);

            const foundItems = await Inventory.find({ _id: { $in: ingredientIds } });

            if (foundItems.length !== ingredientIds.length) {
                return res.status(400).json({
                    success: false,
                    error: 'One or more ingredient IDs are invalid',
                });
            }
        }

        const dish = await Dish.create({ name, price, category, available, ingredients });

        res.status(201).json({
            success: true,
            data: dish,
        });
    } catch (error) {
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                error: messages,
            });
        }

        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc    Get all dishes (with populated ingredient details)
// @route   GET /api/dishes
const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find()
            .populate('ingredients.ingredient')
            .sort({ createdAt: -1 });

        // Calculate cost & profit dynamically (not stored in DB)
        const dishesWithCost = dishes.map((dish) => {
            const dishObj = dish.toObject();

            // Sum up (costPerUnit × quantityRequired) for each ingredient
            const totalIngredientCost = (dishObj.ingredients || []).reduce((sum, item) => {
                const cost = item.ingredient?.costPerUnit || 0;
                return sum + cost * item.quantityRequired;
            }, 0);

            return {
                ...dishObj,
                totalIngredientCost: parseFloat(totalIngredientCost.toFixed(2)),
                estimatedProfit: parseFloat((dishObj.price - totalIngredientCost).toFixed(2)),
            };
        });

        res.status(200).json({
            success: true,
            count: dishesWithCost.length,
            data: dishesWithCost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

module.exports = { addDish, getDishes };
