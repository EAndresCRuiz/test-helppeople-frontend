import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { createCategory, updateCategory } from './categoriesSlice';
import { Category } from '../../types/Category';
import Navigation from '../navigation/Navigation';

const CategoryForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state: RootState) => {
    if (id === undefined) return undefined;
    return state.categories.find(c => c.id === parseInt(id)) as Category;
  });
  
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'> = {
      name,
    };

    if (id) {
      dispatch(updateCategory({ id: parseInt(id), updatedCategory: categoryData })).then(() => {
        navigate('/categories');
      });
    } else {
      dispatch(createCategory(categoryData)).then(() => {
        navigate('/categories');
      });
    }
  };

  return (
    <div>
      <Navigation />
      <h1>{id ? 'Edit Category' : 'Create Category'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit">{id ? 'Update Category' : 'Create Category'}</button>
      </form>
    </div>
  );
};

export default CategoryForm;