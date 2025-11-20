import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartSidebar from '../cart/CartSidebar';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemsCount } = useCart();

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
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        {/* Top Bar */}
        <div className="bg-rose-50 py-2">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-rose-700">
              Free shipping on orders over $50
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
              
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
                <span className="text-xl font-bold text-gray-900">Glamour</span>
              </Link>
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
                      <Link 
                        key={subcategory} 
                        to={`/products?category=${subcategory.toLowerCase()}`} 
                        className="block px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {navigation.pages.map((page) => (
                <Link 
                  key={page} 
                  to={`/${page.toLowerCase().replace(' ', '-')}`} 
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  {page}
                </Link>
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
              
              {/* Cart Button - Fixed to only open sidebar, not navigate */}
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} className="text-gray-600" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
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
                <Link 
                  key={page} 
                  to={`/${page.toLowerCase().replace(' ', '-')}`} 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Cart Sidebar - Higher z-index to ensure it appears above everything */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Header;