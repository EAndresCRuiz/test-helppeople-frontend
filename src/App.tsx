import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProduct from './features/products/CreateProduct';
import ProductList from './features/products/ProductList';
import CreateCategory from './features/categories/CreateCategory';
import CategoryList from './features/categories/CategoryList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto">
          <h1>Product and Category Management</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/categories" element={<CategoryList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
