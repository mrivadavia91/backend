import ProductModel from '../models/Product.js';

export default class ProductDAO {
    async getProductById(productId) {
        try {
            return await ProductModel.findById(productId);
        } catch (error) {
            throw new Error(`Error fetching product: ${error.message}`);
        }
    }

    async getAllProducts() {
        try {
            return await ProductModel.find({});
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async createProduct(productData) {
        try {
            return await ProductModel.create(productData);
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            return await ProductModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            return await ProductModel.findByIdAndDelete(productId);
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}
