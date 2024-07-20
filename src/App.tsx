// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CreateProduct from './components/CreateProduct';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <h1>Product Management</h1>
        <CreateProduct />
        <ProductList />
      </div>
    </Provider>
  );
};

export default App;
