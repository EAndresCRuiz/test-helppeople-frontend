import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProducts } from './productsSlice';
import { Product } from '../../types/Product';
import Navigation from '../navigation/Navigation';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product = useSelector((state: RootState) => 
    state.products.find((p) => p.id === parseInt(id || '', 10))
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navigation />
      <h1>Product Detail</h1>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category ID: {product.category_id}</p>
      </div>
    </div>
  );
};

export default ProductDetail;