import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchProducts, deleteProduct } from './productsSlice';
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

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Navigation />
      <h1>Product List</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <Link to={`/update-product/${product.id}`}>Edit</Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;