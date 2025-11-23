import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('AdminContext: Auth state changed', { user, isAdmin });
    
    // Only fetch admin data if user is authenticated and is admin
    if (user && isAdmin) {
      fetchAdminData();
    } else {
      // Clear data if not admin
      setProducts([]);
      setOrders([]);
      setCategories([]);
      setLoading(false);
    }
  }, [user, isAdmin]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      console.log('Fetching admin data...');
      // Mock data
      const mockProducts = [
        { id: 1, name: 'Hydrating Face Serum', normalPrice: 29.99 },
        { id: 2, name: 'Matte Lipstick - Ruby Red', normalPrice: 14.99 },
        { id: 3, name: 'Volumizing Mascara', normalPrice: 19.99 },
        { id: 4, name: 'Anti-Aging Cream', normalPrice: 49.99 },
        { id: 5, name: 'Facial Cleanser', normalPrice: 12.99 },
        { id: 6, name: 'Eyeshadow Palette', normalPrice: 24.99 }
      ];
      
      const mockOrders = [{ id: 1 }, { id: 2 }];
      const mockCategories = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      
      setProducts(mockProducts);
      setOrders(mockOrders);
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    orders,
    categories,
    loading
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};