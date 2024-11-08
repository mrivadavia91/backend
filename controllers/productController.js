import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = query ? { category: query } : {};
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
        };
        const products = await Product.paginate(filter, options);
        res.json({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            page: products.page,
            hasNextPage: products.hasNextPage,
            hasPrevPage: products.hasPrevPage
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if (!product) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.pid);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};
