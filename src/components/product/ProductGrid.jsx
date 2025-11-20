import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  columns = 4,
  loading = false,
  className = ''
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'
  };

  if (loading) {
    return (
      <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-100 overflow-hidden animate-pulse">
            <div className="bg-gray-200 h-64 w-full"></div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
                <div className="bg-gray-200 h-4 w-10 rounded"></div>
              </div>
              <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-4 w-full rounded"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 h-6 w-16 rounded"></div>
                <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;