import React, { useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartAction, Product } from '../types';
import { CartContext } from './CreateContext';

// Initial state
const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalItems: 0,
};

// Action type constants
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case ADD_TO_CART: {
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingItemIndex !== -1) {
                // Item already exists in cart, update quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };

                return {
                    ...state,
                    items: updatedItems,
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price,
                };
            } else {
                // Add new item to cart
                const newItem = { ...action.payload, quantity: 1 };
                return {
                    ...state,
                    items: [...state.items, newItem],
                    totalItems: state.totalItems + 1,
                    totalPrice: state.totalPrice + action.payload.price,
                };
            }
        }

        case REMOVE_FROM_CART: {
            const existingItem = state.items.find((item) => item.id === action.payload);

            if (!existingItem) return state;

            const updatedItems = state.items.filter((item) => item.id !== action.payload);

            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems - existingItem.quantity,
                totalPrice: state.totalPrice - (existingItem.price * existingItem.quantity),
            };
        }

        case UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex((item) => item.id === id);

            if (existingItemIndex === -1) return state;

            const existingItem = state.items[existingItemIndex];
            const quantityDiff = quantity - existingItem.quantity;

            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
                ...existingItem,
                quantity,
            };

            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems + quantityDiff,
                totalPrice: state.totalPrice + (existingItem.price * quantityDiff),
            };
        }

        case CLEAR_CART:
            return initialState;

        default:
            return state;
    }
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Try to load cart state from localStorage
    const loadCartFromStorage = (): CartState => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : initialState;
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return initialState;
        }
    };

    const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    // Cart actions
    const addToCart = (product: Product) => {
        dispatch({ type: ADD_TO_CART, payload: product });
    };

    const removeFromCart = (productId: number) => {
        dispatch({ type: REMOVE_FROM_CART, payload: productId });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch({
            type: UPDATE_QUANTITY,
            payload: { id: productId, quantity },
        });
    };

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    };

    return (
        <CartContext.Provider
            value={{
                cart: state,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
