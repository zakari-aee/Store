import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // Add this import
import Categories from './pages/Categories';
import Brands from './pages/Brands';

function App() {
  return (
    <Router>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Add this route */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/new-arrivals" element={<Products />} />
            <Route path="/best-sellers" element={<Products />} />
            <Route path="/sale" element={<Products />} />
            <Route path="/gifts" element={<Products />} />
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
}

export default App;