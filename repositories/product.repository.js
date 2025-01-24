import ProductDAO from '../daos/products.dao.js';

export default class ProductRepository {
    constructor() {
        this.productDAO = new ProductDAO();
    }

    async getProductById(productId) {
        try {
            return await this.productDAO.getProductById(productId);
        } catch (error) {
            throw new Error(`Repository error fetching product: ${error.message}`);
        }
    }

    async getAllProducts() {
        try {
            return await this.productDAO.getAllProducts();
        } catch (error) {
            throw new Error(`Repository error fetching products: ${error.message}`);
        }
    }

    async createProduct(productData) {
        try {
            return await this.productDAO.createProduct(productData);
        } catch (error) {
            throw new Error(`Repository error creating product: ${error.message}`);
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            return await this.productDAO.updateProduct(productId, updatedProductData);
        } catch (error) {
            throw new Error(`Repository error updating product: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            return await this.productDAO.deleteProduct(productId);
        } catch (error) {
            throw new Error(`Repository error deleting product: ${error.message}`);
        }
    }
}
