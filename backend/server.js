const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());            // Parse JSON request bodies

// Routes
app.use('/api/dishes', require('./routes/dishRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Orchestrator.ai Backend API is running 🚀' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
