import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Palette, 
  Scissors, 
  Flower,
  Droplets,
  Brush,
  Shirt,
  Gem
} from 'lucide-react';
import { categoryProducts } from '../data/mockData';
import Card from '../components/ui/Card';

const Categories = () => {
  const categories = [
    { 
      name: 'Skincare', 
      icon: Droplets,
      count: `${categoryProducts.Skincare.length} products`, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'Cleansers, moisturizers, serums, and treatments for healthy, radiant skin'
    },
    { 
      name: 'Makeup', 
      icon: Palette,
      count: `${categoryProducts.Makeup.length} products`, 
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      description: 'Foundation, lipstick, mascara, and everything for flawless makeup application'
    },
    { 
      name: 'Haircare', 
      icon: Scissors,
      count: `${categoryProducts.Haircare.length} products`, 
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      description: 'Shampoos, conditioners, treatments for strong, beautiful hair'
    },
    { 
      name: 'Fragrance', 
      icon: Flower,
      count: `${categoryProducts.Fragrance.length} products`, 
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      description: 'Perfumes, body sprays, and roll-ons for every occasion and personality'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Product Categories
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium beauty products, 
            organized to help you find exactly what you need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link 
                key={index} 
                to={`/products?category=${category.name.toLowerCase()}`}
                className="block group"
              >
                <Card className="p-8 border border-gray-100 bg-white hover:border-rose-200 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className={`w-full h-full bg-gradient-to-br ${category.color} rounded-full`}></div>
                  </div>
                  
                  <div className="flex items-start space-x-6 relative z-10">
                    {/* Icon Container */}
                    <div className={`w-20 h-20 ${category.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={32} className={category.iconColor} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {category.description}
                          </p>
                        </div>
                        <ArrowRight size={20} className="text-gray-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all duration-300 mt-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-rose-600 font-semibold text-sm uppercase tracking-wide">
                          {category.count}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Gem size={12} />
                          <Gem size={12} />
                          <Gem size={12} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Line */}
                  <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${category.color} group-hover:w-full transition-all duration-500`}></div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* All Products CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6">
              Browse our complete collection of premium beauty products
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center space-x-3 bg-rose-500 text-white px-8 py-4 rounded-xl hover:bg-rose-600 transition-all duration-300 font-semibold hover:shadow-lg"
            >
              <span>Explore All Products</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div className="p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-rose-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
            <p className="text-gray-600 text-sm">Curated selection of top international brands</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brush size={24} className="text-rose-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Expert Advice</h4>
            <p className="text-gray-600 text-sm">Professional recommendations for your beauty needs</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shirt size={24} className="text-rose-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">Quick shipping across Morocco and international</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;