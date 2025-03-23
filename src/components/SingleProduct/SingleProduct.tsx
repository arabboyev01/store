import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../api/api";
import { Product } from "../../types";
import { useCart } from "../../contexts/useCart";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const productData = await productService.fetchProductById(Number(id));
                setProduct(productData);
                setError(null);
            } catch {
                setError("Failed to fetch product details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500 text-lg font-medium">
                {error}
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500 text-lg font-medium">
                Product not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-lg"
                >
                    Go Back
                </button>
            </div>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Product Image */}
                    <div className="bg-gray-100 flex items-center justify-center p-4">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-80 object-contain rounded-lg mix-blend-multiply"
                        />
                    </div>
                    {/* Product Details */}
                    <div className="p-6">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            {product.title}
                        </h1>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                            {product.category}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 mb-6">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {product.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center text-yellow-500">
                                {/* Stars based on rating */}
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${index < Math.round(product.rating.rate)
                                            ? "fill-current"
                                            : "stroke-current"
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-500">
                                {product.rating.rate} / 5 ({product.rating.count} reviews)
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
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
            </div>
        </div>
    );
};

export default ProductDetails;
