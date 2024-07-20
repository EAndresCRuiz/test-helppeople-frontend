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
    <div className="container mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p>Click the button below to complete your purchase.</p>
      <button
        onClick={handleSimulatePurchase}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;