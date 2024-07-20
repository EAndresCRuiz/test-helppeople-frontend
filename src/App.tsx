import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './features/products/ProductForm';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import CategoryForm from './features/categories/CategoryForm';
import CategoryList from './features/categories/CategoryList';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/Checkout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto">
          <h1>Product and Category Management</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create-product" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/update-product/:id" element={<ProductForm />} />
            <Route path="/create-category" element={<CategoryForm />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/update-category/:id" element={<CategoryForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;