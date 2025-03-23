import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useCart } from '../contexts/useCart';

const Cart: React.FC = () => {
    const { cart, clearCart } = useCart();

    return (
        <div className="max-w-[800px] w-full mx-auto p-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
            </div>

            {/* Check if cart is empty */}
            {cart.items.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-600">Your cart is empty</h3>
                    <p className="text-gray-500 mt-2 mb-6">Add some products to your cart</p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Go to Catalog
                    </Link>
                </div>
            ) : (
                <div>
                    {/* Cart Details */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Header Row */}
                        <div className="px-6 py-4 border-b bg-gray-100">
                            <div className="grid grid-cols-4 text-sm font-semibold text-gray-700">
                                <div className="col-span-2">Product</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-right">Total</div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="divide-y">
                            {cart.items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Subtotal Section */}
                        <div className="px-6 py-4 bg-gray-100">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Subtotal</span>
                                <span>${cart.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center mt-6 gap-4 justify-end">
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 h-12 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 hover:shadow-md transition duration-200"
                        >
                            Clear Cart
                        </button>
                        <button
                            className="px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
                            onClick={() => alert("Checkout functionality would go here")}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;