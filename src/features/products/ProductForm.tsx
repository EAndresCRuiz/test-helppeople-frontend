import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { createProduct, updateProduct } from './productsSlice';
import { Product } from '../../types/Product';
import Navigation from '../navigation/Navigation';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => {
    if (id === undefined) return undefined;
    return state.products.find(p => p.id === parseInt(id)) as Product;
  });
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCategoryId(product.category_id.toString());
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
      name,
      description,
      price: parseFloat(price),
      category_id: parseInt(categoryId),
    };

    if (id) {
      dispatch(updateProduct({ id: parseInt(id), updatedProduct: productData })).then(() => {
        navigate('/products');
      });
    } else {
      dispatch(createProduct(productData)).then(() => {
        navigate('/products');
      });
    }
  };

  return (
    <div>
      <Navigation />
      <h1>{id ? 'Edit Product' : 'Create Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Category ID</label>
          <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
        </div>
        <button type="submit">{id ? 'Update Product' : 'Create Product'}</button>
      </form>
    </div>
  );
};

export default ProductForm;