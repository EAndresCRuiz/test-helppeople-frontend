import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/create-product">Create Product</Link>
        </li>
        <li>
          <Link to="/create-category">Create Category</Link>
        </li>
        <li>
          <Link to="/categories">Category List</Link>
        </li>
        <li>
          <Link to="/cart">Shopping Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;