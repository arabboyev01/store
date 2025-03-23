import{ Suspense } from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
    return (
        <Suspense fallback={<div>Loading cart...</div>}>
            <Cart />
        </Suspense>
    );
};

export default CartPage;