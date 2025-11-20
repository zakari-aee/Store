import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartSidebar from '../cart/CartSidebar';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change (page refresh or navigation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    pages: [
      { name: 'New Arrivals', path: '/new-arrivals' },
      { name: 'Best Sellers', path: '/best-sellers' },
      { name: 'Sale', path: '/sale' },
      { name: 'Gifts', path: '/gifts' }
    ]
  };

  const handleLogoClick = (e) => {
    // If we're already on the home page, scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // Otherwise, the Link will handle navigation to home
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
    setIsMenuOpen(false);
  };

  const handleSubcategoryClick = (subcategoryName) => {
    navigate(`/products?category=${subcategoryName.toLowerCase()}`);
  };

  const handleMainCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
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
              
              <Link 
                to="/" 
                className="flex items-center space-x-2"
                onClick={handleLogoClick}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
                <span className="text-xl font-bold text-gray-900">Elhilali Cosmitecs</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.categories.map((category) => (
                <div key={category.name} className="relative group">
                  {/* Main Category - Now clickable */}
                  <button 
                    onClick={() => handleMainCategoryClick(category.name)}
                    className="flex items-center text-gray-700 hover:text-rose-600 font-medium py-2 transition-colors"
                  >
                    {category.name}
                  </button>
                  
                  {/* Dropdown for Subcategories */}
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-50">
                    {/* View All Category Link */}
                    <button 
                      onClick={() => handleMainCategoryClick(category.name)}
                      className="block w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium transition-colors border-b border-gray-100 mb-2"
                    >
                      View All {category.name}
                    </button>
                    
                    {category.subcategories.map((subcategory) => (
                      <button 
                        key={subcategory} 
                        onClick={() => handleSubcategoryClick(subcategory)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {navigation.pages.map((page) => (
                <Link 
                  key={page.name} 
                  to={page.path} 
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  {page.name}
                </Link>
              ))}
            </nav>

            {/* Right: User Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} className="text-gray-600" />
              </button>

              
              {/* Cart Button */}
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

          {/* Mobile Search Button */}
          <div className="md:hidden mt-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-center space-x-2 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Search size={20} />
              <span>Search for products, brands...</span>
            </button>
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
              {/* Categories */}
              <div className="border-b border-gray-100">
                <h3 className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">Categories</h3>
                {navigation.categories.map((category) => (
                  <div key={category.name} className="border-b border-gray-100">
                    {/* Main Category in Mobile */}
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className="w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-between"
                    >
                      {category.name}
                      <span className="text-gray-400">→</span>
                    </button>
                    
                    {/* Subcategories in Mobile */}
                    <div className="bg-gray-50 pl-6">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => {
                            handleSubcategoryClick(subcategory);
                            setIsMenuOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-b border-gray-100 last:border-b-0"
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pages */}
              <div className="border-b border-gray-100">
                <h3 className="px-4 py-3 font-semibold text-gray-900 bg-gray-50">Pages</h3>
                {navigation.pages.map((page) => (
                  <Link 
                    key={page.name} 
                    to={page.path} 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>

              {/* Quick Links */}
              <div className="p-4">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-rose-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-rose-600 transition-colors mb-3"
                >
                  <Search size={20} />
                  <span>Search Products</span>
                </button>
                
                <Link 
                  to="/categories" 
                  className="block w-full text-center py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Header;