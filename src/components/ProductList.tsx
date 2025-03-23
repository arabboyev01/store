import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductListProps {
    products: Product[];
    loading: boolean;
    error: Error | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, error }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-center">
                    <h3 className="text-xl font-bold mb-2">Error loading products</h3>
                    <p>{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl text-gray-600">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;