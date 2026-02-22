# Orchestrator.ai — Backend API

Simple Node.js + Express + MongoDB backend for the restaurant web app.

## Folder Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── dishController.js  # Business logic
├── models/
│   └── Dish.js            # Mongoose schema
├── routes/
│   └── dishRoutes.js      # API routes
├── .env                   # Environment variables
├── server.js              # Entry point
└── package.json
```

## Setup & Run

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

Edit `.env` and set your MongoDB URI:

```
MONGO_URI=mongodb://localhost:27017/orchestrator-restaurant
PORT=5000
```

> If using MongoDB Atlas, replace with your Atlas connection string:
> `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/orchestrator-restaurant`

### 3. Start the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Server will run at `http://localhost:5000`

## API Endpoints

| Method | Endpoint       | Description     | Body                                         |
|--------|----------------|-----------------|----------------------------------------------|
| GET    | `/`            | Health check    | —                                            |
| GET    | `/api/dishes`  | Get all dishes  | —                                            |
| POST   | `/api/dishes`  | Add a new dish  | `{ "name": "Burger", "price": 12.5, "category": "Mains" }` |

### Example: Add a dish

```bash
curl -X POST http://localhost:5000/api/dishes \
  -H "Content-Type: application/json" \
  -d '{"name": "Truffle Burger", "price": 12.50, "category": "Mains"}'
```

### Example: Get all dishes

```bash
curl http://localhost:5000/api/dishes
```
