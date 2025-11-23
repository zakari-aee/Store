import React from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { products, orders, categories, loading: adminLoading } = useAdmin();

  console.log('Auth state:', { user, isAdmin, authLoading });
  console.log('Admin data:', { products, orders, categories, adminLoading });

  // Show loading state for auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated or not admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Admin Login</h2>
          <LoginForm />
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  // Show admin dashboard if authenticated and is admin
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {adminLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading admin data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Products</h2>
              <p className="text-2xl font-bold">{products?.length || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Orders</h2>
              <p className="text-2xl font-bold">{orders?.length || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Categories</h2>
              <p className="text-2xl font-bold">{categories?.length || 0}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Products List</h2>
            {products && products.length > 0 ? (
              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">${product.normalPrice}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No products found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;