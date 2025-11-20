import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation = {
    categories: [
      {
        name: 'Skincare',
        subcategories: ['Cleansers', 'Moisturizers', 'Serums', 'Masks', 'Sunscreen', 'Toners']
      },
      {
        name: 'Makeup',
        subcategories: ['Foundation', 'Concealer', 'Lipstick', 'Mascara', 'Eyeshadow', 'Blush']
      },
      {
        name: 'Haircare',
        subcategories: ['Shampoo', 'Conditioner', 'Hair Mask', 'Hair Oil', 'Styling', 'Treatment']
      },
      {
        name: 'Fragrance',
        subcategories: ['Perfume', 'Body Spray', 'Roll-on', 'Sample Set']
      }
    ],
    brands: ['L\'Oreal', 'Maybelline', 'Nyx', 'MAC', 'Estee Lauder', 'Clinique'],
    pages: ['New Arrivals', 'Best Sellers', 'Sale', 'Gifts']
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        {/* Top Bar */}
        <div className="bg-rose-50 py-2">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-rose-700">
              ✨ Free shipping on orders over $50 + 3 free samples
            </p>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
                <span className="text-xl font-bold text-gray-900">Glamour</span>
              </a>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.categories.map((category) => (
                <div key={category.name} className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-rose-600 font-medium py-2 transition-colors">
                    {category.name}
                  </button>
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    {category.subcategories.map((subcategory) => (
                      <a 
                        key={subcategory} 
                        href="#" 
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {subcategory}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              
              {navigation.pages.map((page) => (
                <a 
                  key={page} 
                  href="#" 
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  {page}
                </a>
              ))}
            </nav>

            {/* Right: User Actions */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} className="text-gray-600" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <User size={20} className="text-gray-600" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Heart size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingBag size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Menu</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="h-full overflow-y-auto">
              {navigation.categories.map((category) => (
                <div key={category.name} className="border-b border-gray-100">
                  <button className="w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    {category.name}
                    <span>+</span>
                  </button>
                </div>
              ))}
              
              {navigation.pages.map((page) => (
                <a 
                  key={page} 
                  href="#" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  {page}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
};

export default Header;