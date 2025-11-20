import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

const SearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['lipstick', 'foundation', 'serum']);
  const [popularSearches, setPopularSearches] = useState(['matte lipstick', 'vitamin c serum', 'mascara', 'sunscreen']);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      onClose();
      // Here you would typically navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  const quickSearches = [
    { term: 'Skincare Routine', category: 'Skincare' },
    { term: 'Matte Foundation', category: 'Makeup' },
    { term: 'Hair Treatment', category: 'Haircare' },
    { term: 'Summer Fragrance', category: 'Fragrance' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
              <span className="text-lg font-bold text-gray-900">Glamour</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, or categories..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </form>
        </div>
      </div>

      {/* Search Content */}
      <div className="container mx-auto px-4 py-6">
        {!searchQuery ? (
          <div className="max-w-4xl mx-auto">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock size={18} className="text-gray-400" />
                  <h3 className="font-semibold text-gray-900">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp size={18} className="text-gray-400" />
                <h3 className="font-semibold text-gray-900">Popular Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-sm transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Searches */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(item.term)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-all text-left"
                  >
                    <div className="font-medium text-gray-900">{item.term}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 text-center py-8">
              Search results for: <span className="font-semibold text-gray-900">"{searchQuery}"</span>
            </p>
            {/* Search results would be implemented here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;