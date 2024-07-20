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
    <div>
      <Navigation />
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearCart}>Clear Cart</button>
      <Link to="/checkout"><button>Proceed to Checkout</button></Link>
    </div>
  );
};

export default Cart;