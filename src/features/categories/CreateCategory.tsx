import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createCategory } from './categoriesSlice';
import { Category } from '../../types/Category';
import Navigation from '../navigation/Navigation';

const CreateCategory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Omit<Category, 'id' | 'created_at' | 'updated_at'> = {
      name,
    };
    dispatch(createCategory(newCategory));
  };

  return (
    <div>
      <Navigation />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;