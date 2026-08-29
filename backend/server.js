require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'BeanAura API is running'
    });
});

app.use('/api/products', productRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const startServer = async () => {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`BeanAura server running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error('Server startup failed:', error.message);
    process.exit(1);
});