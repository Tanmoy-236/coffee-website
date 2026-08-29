const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isAvailable: true })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to load products'
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid product ID'
        });
    }
};

module.exports = {
    getProducts,
    getProductById
};