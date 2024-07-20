import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createProduct } from './productsSlice';
import { Product } from '../../types/Product';
import Navigation from '../navigation/Navigation';

const CreateProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
      name,
      description,
      price: parseFloat(price),
      category_id: parseInt(categoryId),
    };
    dispatch(createProduct(newProduct));
  };

  return (
    <div>
      <Navigation />
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;