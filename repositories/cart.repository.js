import CartDAO from '../daos/carts.dao.js';

export default class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
    }

    async getCartById(cartId) {
        try {
            return await this.cartDAO.getCartById(cartId);
        } catch (error) {
            throw new Error(`Repository error fetching cart: ${error.message}`);
        }
    }

    async updateCart(cartId, updatedCartData) {
        try {
            return await this.cartDAO.updateCart(cartId, updatedCartData);
        } catch (error) {
            throw new Error(`Repository error updating cart: ${error.message}`);
        }
    }

    async createCart(cartData) {
        try {
            return await this.cartDAO.createCart(cartData);
        } catch (error) {
            throw new Error(`Repository error creating cart: ${error.message}`);
        }
    }

    async deleteCart(cartId) {
        try {
            return await this.cartDAO.deleteCart(cartId);
        } catch (error) {
            throw new Error(`Repository error deleting cart: ${error.message}`);
        }
    }
}
