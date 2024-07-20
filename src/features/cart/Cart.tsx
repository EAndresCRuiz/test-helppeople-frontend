import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchCartItems, removeFromCart, clearCart } from './cartSlice';
import Navigation from '../navigation/Navigation';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <ul className="grid grid-cols-1 gap-4">
        {cartItems.map(item => (
          <li key={item.id} className="border rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">{item.product.name}</p>
                <p className="mt-2">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={handleClearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Clear Cart
        </button>
        <Link to="/checkout">
          <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;