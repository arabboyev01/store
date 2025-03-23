import { Product } from '../types';

const API_URL = 'https://fakestoreapi.com';

class ProductService {
    // Fetch all products
    public async fetchProducts(): Promise<Product[]> {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    // Fetch product by ID
    public async fetchProductById(id: number): Promise<Product> {
        try {
            const response = await fetch(`${API_URL}/products/${id}`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    }

    // Fetch categories
    public async fetchCategories(): Promise<string[]> {
        try {
            const response = await fetch(`${API_URL}/products/categories`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}

// Export an instance of the class
const productService = new ProductService();
export default productService;
