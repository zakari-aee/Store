import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';

const ProductFilters = ({ 
  filters, 
  onFiltersChange, 
  productCount,
  className = '' 
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    brand: [],
    priceRange: '',
    rating: null
  });

  const filterOptions = {
    category: [
      'Skincare',
      'Makeup',
      'Haircare',
      'Fragrance',
      'Bath & Body',
      'Tools & Brushes'
    ],
    brand: [
      'L\'Oreal',
      'Maybelline',
      'Nyx',
      'MAC',
      'Estee Lauder',
      'Clinique',
      'La Roche-Posay',
      'Olaplex'
    ],
    priceRange: [
      { label: 'Under $25', value: '0-25' },
      { label: '$25 - $50', value: '25-50' },
      { label: '$50 - $100', value: '50-100' },
      { label: 'Over $100', value: '100-1000' }
    ],
    rating: [
      { stars: 5, label: '5 Stars & Up' },
      { stars: 4, label: '4 Stars & Up' },
      { stars: 3, label: '3 Stars & Up' },
      { stars: 2, label: '2 Stars & Up' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters };
    
    if (filterType === 'category' || filterType === 'brand') {
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
    } else {
      newFilters[filterType] = newFilters[filterType] === value ? null : value;
    }
    
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      category: [],
      brand: [],
      priceRange: '',
      rating: null
    };
    setActiveFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      }
      return count + (filter ? 1 : 0);
    }, 0);
  };

  const FilterSection = ({ title, children, isOpen = true }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(isOpen);
    
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-2"
          onClick={() => setIsSectionOpen(!isSectionOpen)}
        >
          {title}
          {isSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isSectionOpen && <div className="space-y-2">{children}</div>}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Mobile Filters Header */}
      <div className="lg:hidden border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            <span className="font-semibold text-gray-900">Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-rose-500 text-white text-xs rounded-full px-2 py-1">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isFiltersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Filters Content */}
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block p-4`}>
        {/* Filters Header */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-rose-600 hover:text-rose-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category Filter */}
        <FilterSection title="Category">
          {filterOptions.category.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.category.includes(category)}
                onChange={() => handleFilterChange('category', category)}
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="Brand">
          {filterOptions.brand.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.brand.includes(brand)}
                onChange={() => handleFilterChange('brand', brand)}
                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection title="Price Range">
          {filterOptions.priceRange.map((range) => (
            <label key={range.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                checked={activeFilters.priceRange === range.value}
                onChange={() => handleFilterChange('priceRange', range.value)}
                className="border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Customer Rating">
          {filterOptions.rating.map((rating) => (
            <label key={rating.stars} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={activeFilters.rating === rating.stars}
                onChange={() => handleFilterChange('rating', rating.stars)}
                className="border-gray-300 text-rose-600 focus:ring-rose-500"
              />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating.stars ? 'text-amber-400 fill-current' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-700">{rating.label}</span>
            </label>
          ))}
        </FilterSection>

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {activeFilters.category.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800"
                >
                  {category}
                  <button
                    onClick={() => handleFilterChange('category', category)}
                    className="ml-2 hover:text-rose-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {activeFilters.brand.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800"
                >
                  {brand}
                  <button
                    onClick={() => handleFilterChange('brand', brand)}
                    className="ml-2 hover:text-rose-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {activeFilters.priceRange && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">
                  Price: {filterOptions.priceRange.find(r => r.value === activeFilters.priceRange)?.label}
                  <button
                    onClick={() => handleFilterChange('priceRange', '')}
                    className="ml-2 hover:text-rose-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {activeFilters.rating && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-800">
                  {activeFilters.rating}+ Stars
                  <button
                    onClick={() => handleFilterChange('rating', null)}
                    className="ml-2 hover:text-rose-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-6 text-center lg:text-left">
          <p className="text-sm text-gray-600">
            Showing {productCount} products
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;