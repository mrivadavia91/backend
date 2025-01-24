import CartModel from '../models/Cart.js';

export default class CartDAO {
    async getCartById(cartId) {
        try {
            return await CartModel.findById(cartId).populate('products.product');
        } catch (error) {
            throw new Error(`Error fetching cart: ${error.message}`);
        }
    }

    async updateCart(cartId, updatedCartData) {
        try {
            return await CartModel.findByIdAndUpdate(cartId, updatedCartData, { new: true });
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }

    async createCart(cartData) {
        try {
            return await CartModel.create(cartData);
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async deleteCart(cartId) {
        try {
            return await CartModel.findByIdAndDelete(cartId);
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }
}
