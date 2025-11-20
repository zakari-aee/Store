import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, Star } from 'lucide-react';
import { mockProducts } from '../../data/mockData';

const SearchBar = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState(['lipstick', 'foundation', 'serum']);
    const [popularSearches, setPopularSearches] = useState(['matte lipstick', 'vitamin c serum', 'mascara', 'sunscreen']);
    const inputRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Prevent body scroll when search is open
        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    // Search functionality
    useEffect(() => {
        if (searchQuery.trim()) {
            const results = mockProducts.filter(product => {
                const query = searchQuery.toLowerCase();
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.subcategory.toLowerCase().includes(query)
                );
            });
            setSearchResults(results.slice(0, 20)); // Limit results for performance
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Add to recent searches
            const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
            setRecentSearches(updatedSearches);
            // Navigate to products page with search query
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            onClose();
        }
    };

    const handleProductClick = (product) => {
        // Change to match your route: /products/:id (plural)
        navigate(`/products/${product.id}`);
        onClose();
    };

    const handleQuickSearch = (term) => {
        setSearchQuery(term);
        // Focus back to input after quick search
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
    };

    const clearSearch = () => {
        setSearchQuery('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const quickSearches = [
        { term: 'Skincare Routine', category: 'Skincare' },
        { term: 'Matte Foundation', category: 'Makeup' },
        { term: 'Hair Treatment', category: 'Haircare' },
        { term: 'Summer Fragrance', category: 'Fragrance' }
    ];

    const getCategoryColor = (category) => {
        const colors = {
            'Skincare': 'bg-blue-100 text-blue-800',
            'Makeup': 'bg-pink-100 text-pink-800',
            'Haircare': 'bg-purple-100 text-purple-800',
            'Fragrance': 'bg-green-100 text-green-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* Header */}
            <div className="flex-none border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
                            <span className="text-lg font-bold text-gray-900">
Elhilali Cosmitecs</span>
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
            <div className="flex-none border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products, brands, or categories..."
                            className="w-full pl-12 pr-12 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* Search Content - Scrollable Area */}
            <div
                ref={contentRef}
                className="flex-1 overflow-y-auto"
            >
                <div className="container mx-auto px-4 py-4">
                    {!searchQuery ? (
                        <div className="max-w-4xl mx-auto">
                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Clock size={18} className="text-gray-400" />
                                        <h3 className="font-semibold text-gray-900">Recent Searches</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {recentSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickSearch(search)}
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                                            >
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Popular Searches */}
                            <div className="mb-6">
                                <div className="flex items-center space-x-2 mb-3">
                                    <TrendingUp size={18} className="text-gray-400" />
                                    <h3 className="font-semibold text-gray-900">Popular Searches</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickSearch(search)}
                                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-sm transition-colors"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Searches */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Quick Categories</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {quickSearches.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickSearch(item.term)}
                                            className="p-3 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-all text-left"
                                        >
                                            <div className="font-medium text-gray-900 text-sm">{item.term}</div>
                                            <div className="text-xs text-gray-500">{item.category}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            {/* Search Results Header */}
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-600 text-sm">
                                    {searchResults.length > 0 ? (
                                        <>
                                            Found <span className="font-semibold text-gray-900">{searchResults.length}</span> products for:{" "}
                                            <span className="font-semibold text-gray-900">"{searchQuery}"</span>
                                        </>
                                    ) : (
                                        <>
                                            No results found for:{" "}
                                            <span className="font-semibold text-gray-900">"{searchQuery}"</span>
                                        </>
                                    )}
                                </p>
                                {searchResults.length > 0 && (
                                    <button
                                        onClick={handleSearch}
                                        className="text-rose-600 hover:text-rose-700 font-medium text-sm"
                                    >
                                        View All Results
                                    </button>
                                )}
                            </div>

                            {/* Search Results */}
                            {searchResults.length > 0 ? (
                                <div className="space-y-3">
                                    {searchResults.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleProductClick(product)}
                                            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-all cursor-pointer group"
                                        >
                                            {/* Product Image */}
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                                            />

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-1">
                                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                                                        {product.category}
                                                    </span>
                                                    <div className="flex items-center space-x-1">
                                                        <Star size={12} className="text-amber-400 fill-current" />
                                                        <span className="text-xs text-gray-600">{product.rating}</span>
                                                    </div>
                                                </div>

                                                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                                                    {product.name}
                                                </h3>

                                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                    {product.description}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            ${product.normalPrice}
                                                        </span>
                                                        {product.priceBulk < product.normalPrice && (
                                                            <span className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                                                                Bulk: ${product.priceBulk}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-500">{product.brand}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* No Results State */
                                <div className="text-center py-8">
                                    <Search size={40} className="text-gray-300 mx-auto mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Try adjusting your search terms or browse our categories
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {['Skincare', 'Makeup', 'Haircare', 'Fragrance'].map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => handleQuickSearch(category)}
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Search Suggestions */}
                            {searchResults.length === 0 && searchQuery && (
                                <div className="mt-6">
                                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Try searching for:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Foundation', 'Lipstick', 'Moisturizer', 'Shampoo', 'Perfume', 'Serum'].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => handleQuickSearch(term)}
                                                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-sm transition-colors"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;