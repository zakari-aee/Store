import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { mockProducts, categoryProducts } from '../data/mockData';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  // Get category from URL params
  const categoryParam = searchParams.get('category');

  // Set initial category filter from URL
  useEffect(() => {
    if (categoryParam) {
      const category = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (categoryProducts[category]) {
        setActiveFilters(prev => ({
          ...prev,
          category: [category]
        }));
      }
    }
  }, [categoryParam]);

  // Simulate filtering
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = [...mockProducts];
      
      // Apply category filter
      if (activeFilters.category && activeFilters.category.length > 0) {
        filtered = filtered.filter(product => 
          activeFilters.category.includes(product.category)
        );
      }
      
      // Apply brand filter
      if (activeFilters.brand && activeFilters.brand.length > 0) {
        filtered = filtered.filter(product => 
          activeFilters.brand.includes(product.brand)
        );
      }
      
      // Apply price range filter
      if (activeFilters.priceRange) {
        const [min, max] = activeFilters.priceRange.split('-').map(Number);
        filtered = filtered.filter(product => 
          product.normalPrice >= min && product.normalPrice <= max
        );
      }
      
      // Apply rating filter
      if (activeFilters.rating) {
        filtered = filtered.filter(product => 
          product.rating >= activeFilters.rating
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.normalPrice - b.normalPrice);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.normalPrice - a.normalPrice);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => b.id - a.id);
          break;
        default:
          // featured - keep original order
          break;
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeFilters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryParam ? `${categoryParam} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {categoryParam 
              ? `Discover our complete collection of ${categoryParam.toLowerCase()} products`
              : 'Discover our complete collection of premium beauty products'
            }
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={20} />
            <span>Filters & Sort</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Mobile Overlay */}
          {isFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsFiltersOpen(false)} />
              <div className="absolute inset-y-0 left-0 w-80 bg-white overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={() => setIsFiltersOpen(false)} className="p-2">✕</button>
                  </div>
                </div>
                <div className="p-4">
                  <ProductFilters
                    filters={activeFilters}
                    onFiltersChange={handleFiltersChange}
                    productCount={filteredProducts.length}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <ProductFilters
              filters={activeFilters}
              onFiltersChange={handleFiltersChange}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Products Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {filteredProducts.length} of {mockProducts.length} products
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <SortAsc size={18} className="text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {Object.keys(activeFilters).some(key => 
                Array.isArray(activeFilters[key]) ? activeFilters[key].length > 0 : activeFilters[key]
              ) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              columns={viewMode === 'list' ? 1 : 2}
              loading={loading}
            />

            {/* Load More */}
            {!loading && filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;