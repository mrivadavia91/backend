import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketService from '../services/ticket.service.js';

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketService = new TicketService();

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const updatedCartData = req.body;
        const updatedCart = await cartRepository.updateCart(cid, updatedCartData);
        if (!updatedCart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.status(200).json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartRepository.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        let totalAmount = 0;
        const unavailableProducts = [];

        for (const item of cart.products) {
            const product = await productRepository.getProductById(item.product._id);

            if (product && product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await productRepository.updateProduct(product._id, { stock: product.stock });
                totalAmount += product.price * item.quantity;
            } else {
                unavailableProducts.push(item.product._id);
            }
        }

        const purchasedProducts = cart.products.filter(item => !unavailableProducts.includes(item.product._id));
        const remainingProducts = cart.products.filter(item => unavailableProducts.includes(item.product._id));

        if (purchasedProducts.length > 0) {
            await ticketService.createTicket({
                amount: totalAmount,
                purchaser: req.user.email,
            });
        }

        cart.products = remainingProducts;
        await cartRepository.updateCart(cid, cart);

        res.status(200).json({
            status: 'success',
            message: 'Purchase completed',
            unavailableProducts,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
