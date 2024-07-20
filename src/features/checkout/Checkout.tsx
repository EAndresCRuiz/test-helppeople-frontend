import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearCart } from '../cart/cartSlice';
import Navigation from '../navigation/Navigation';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSimulatePurchase = () => {
    dispatch(clearCart());
    alert('Purchase completed successfully!');
    navigate('/products');
  };

  return (
    <div>
      <Navigation />
      <h1>Checkout</h1>
      <p>Click the button below to complete your purchase.</p>
      <button onClick={handleSimulatePurchase}>Complete Purchase</button>
    </div>
  );
};

export default Checkout;