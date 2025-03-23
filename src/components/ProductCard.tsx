import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/useCart';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const navigateProductDetail = (productId: number) => {
        navigate(`/product/${productId}`);
    }

    return (
        <div
            onClick={() => navigateProductDetail(product.id)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="h-48 p-4 flex items-center justify-center bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain w-full mix-blend-multiply"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate mb-1" title={product.title}>
                    {product.title}
                </h3>
                <div className="mb-3 text-xs font-medium text-gray-500">
                    {product.category}
                </div>

                <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm">{product.rating.rate} ({product.rating.count})</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product)
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;