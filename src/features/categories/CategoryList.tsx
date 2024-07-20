import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchCategories, deleteCategory } from './categoriesSlice';
import { Category } from '../../types/Category';
import Navigation from '../navigation/Navigation';
import { Link } from 'react-router-dom';

const CategoryList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories as Category[]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div>
      <Navigation />
      <h1>Category List</h1>
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>
            {category.name}
            <Link to={`/update-category/${category.id}`}>Edit</Link>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;