const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import path module
const userRoutes = require('./routes/userRoutes');
const bomRoutes = require('./routes/bomRoutes');
const documentRoutes = require('./routes/documentRoutes'); // Import document routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors()); // For handling Cross-Origin Resource Sharing (CORS)

// Serve static files (index.html, dashboard.html, js, css) from the client folder
app.use(express.static(path.join(__dirname, '../client'))); // Serve files from the 'client' folder

// API Routes
app.use('/api/auth', userRoutes); // User authentication routes (signup, login)
app.use('/api/bom', bomRoutes);   // BOM-related routes
app.use('/api/documents', documentRoutes); // Document routes (CRUD operations for documents)

// Route to serve the dashboard page
app.get('/dashboard', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dashboard.html')); // Serve 'dashboard.html' from 'client' folder
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Database connection error:", err));

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
