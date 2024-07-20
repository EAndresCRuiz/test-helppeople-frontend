import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById } from './productsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { Product } from '../../types/Product';
import Navigation from '../navigation/Navigation';
import { Category } from '../../types/Category';
import { fetchCategories } from '../categories/categoriesSlice';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.find((product) => product.id === Number(id))
  );
  const categories = useSelector((state: RootState) => state.categories as Category[]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
    if (id && product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setCategoryId(product.category_id.toString());
    } else if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, product, dispatch]);

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
    navigate('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <h1 className="text-3xl font-bold mb-4">{id ? 'Update Product' : 'Create Product'}</h1>
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
            placeholder="Product Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Product Description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Product Price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {id ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;