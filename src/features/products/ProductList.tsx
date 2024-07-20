// src/features/products/ProductList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { Product } from '../../types/Product';
import Navigation from '../navigation/Navigation';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products as Product[]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: Product) => (
          <li key={product.id} className="border rounded-lg p-4 shadow-md">
            <Link to={`/products/${product.id}`} className="text-xl font-semibold text-blue-500">
              {product.name}
            </Link>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;