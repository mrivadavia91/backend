// import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

import cartsRouter from '../routes/cartsRouter.js';

export const createCart = async (req, res) => {
    try {
        const newCart = new Cart();
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const product = await Product.findById(req.params.pid);

        const productIndex = cart.products.findIndex(p => p.product.equals(product._id));
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: product._id, quantity: 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body.products }, { new: true });
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const productIndex = cart.products.findIndex(p => p.product.equals(req.params.pid));
        if (productIndex > -1) {
            cart.products[productIndex].quantity = req.body.quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ status: 'error', error: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            req.params.cid,
            { $pull: { products: { product: req.params.pid } } },
            { new: true }
        );
        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};
