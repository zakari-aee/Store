import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryProducts } from '../data/mockData';
import Card from '../components/ui/Card';

const Categories = () => {
  const categories = [
    { 
      name: 'Skincare', 
      emoji: '✨', 
      count: `${categoryProducts.Skincare.length} products`, 
      color: 'from-blue-400 to-cyan-400',
      description: 'Cleansers, moisturizers, serums, and treatments for healthy skin'
    },
    { 
      name: 'Makeup', 
      emoji: '💄', 
      count: `${categoryProducts.Makeup.length} products`, 
      color: 'from-rose-400 to-pink-400',
      description: 'Foundation, lipstick, mascara, and everything for perfect makeup'
    },
    { 
      name: 'Haircare', 
      emoji: '👩‍🦰', 
      count: `${categoryProducts.Haircare.length} products`, 
      color: 'from-purple-400 to-indigo-400',
      description: 'Shampoos, conditioners, treatments for beautiful hair'
    },
    { 
      name: 'Fragrance', 
      emoji: '🌸', 
      count: `${categoryProducts.Fragrance.length} products`, 
      color: 'from-green-400 to-emerald-400',
      description: 'Perfumes, body sprays, and roll-ons for every occasion'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our complete collection of beauty products by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/products?category=${category.name.toLowerCase()}`}
              className="block"
            >
              <Card hover className="p-6 border-0 bg-white hover:shadow-lg transition-all h-full">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0`}>
                    {category.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                      <ArrowRight size={20} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                    <p className="text-rose-600 font-medium">{category.count}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* All Products CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-flex items-center space-x-2 bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
          >
            <span>View All Products</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;