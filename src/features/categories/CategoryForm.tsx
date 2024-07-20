import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { createCategory, updateCategory, fetchCategoryById } from './categoriesSlice';
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
    if (id && category) {
      setName(category.name);
    } else if (id) {
      dispatch(fetchCategoryById(Number(id)));
    }
  }, [id, category, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'> = {
      name,
    };

    if (id) {
      dispatch(updateCategory({ id: parseInt(id), updatedCategory: categoryData }));
    } else {
      dispatch(createCategory(categoryData));
    }
    navigate('/categories');
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4">{id ? 'Update Category' : 'Create Category'}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Category Name"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;