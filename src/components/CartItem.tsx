import React from 'react';
import { useCart } from '../contexts/useCart';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity >= 1) {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div className="w-full flex flex-col sm:flex-row items-center p-4 border-b gap-4">
            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 p-2 rounded">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                />
            </div>

            <div className="flex-1 ml-0 sm:ml-4 mt-3 sm:mt-0 w-full">
                <h3 className="text-lg font-medium max-w-[300px] truncate">{item.title}</h3>
                <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                <div className="flex items-center justify-between border rounded">
                    <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 border-r hover:bg-gray-100"
                    >
                        -
                    </button>
                    <input  
                        min="1"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        className="w-12 py-1 text-center border-none focus:outline-none focus:ring-0"
                    />
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 border-l hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>

                <div className="text-lg font-semibold w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CartItem;