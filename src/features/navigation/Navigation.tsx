import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-400">Product List</Link>
        </li>
        <li>
          <Link to="/create-product" className="hover:text-gray-400">Create Product</Link>
        </li>
        <li>
          <Link to="/create-category" className="hover:text-gray-400">Create Category</Link>
        </li>
        <li>
          <Link to="/categories" className="hover:text-gray-400">Category List</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-400">Shopping Cart</Link>
        </li>
        <li>
          <Link to="/checkout" className="hover:text-gray-400">Checkout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;