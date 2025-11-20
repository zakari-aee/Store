import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const Categories = () => {
  const categories = [
    {
      name: 'Skincare',
      description: 'Cleansers, moisturizers, serums, and treatments for healthy, glowing skin',
      emoji: '✨',
      count: '120+ products',
      color: 'from-blue-400 to-cyan-400',
      subcategories: ['Cleansers', 'Moisturizers', 'Serums', 'Masks', 'Sunscreen', 'Toners']
    },
    {
      name: 'Makeup',
      description: 'Foundation, lipstick, eyeshadow, and more for flawless beauty',
      emoji: '💄',
      count: '85+ products',
      color: 'from-rose-400 to-pink-400',
      subcategories: ['Foundation', 'Concealer', 'Lipstick', 'Mascara', 'Eyeshadow', 'Blush']
    },
    {
      name: 'Haircare',
      description: 'Shampoo, conditioner, treatments for beautiful, healthy hair',
      emoji: '👩‍🦰',
      count: '60+ products',
      color: 'from-purple-400 to-indigo-400',
      subcategories: ['Shampoo', 'Conditioner', 'Hair Mask', 'Hair Oil', 'Styling', 'Treatment']
    },
    {
      name: 'Fragrance',
      description: 'Perfumes, body sprays, and roll-ons for lasting scent',
      emoji: '🌸',
      count: '45+ products',
      color: 'from-green-400 to-emerald-400',
      subcategories: ['Perfume', 'Body Spray', 'Roll-on', 'Sample Set']
    },
    {
      name: 'Bath & Body',
      description: 'Body wash, lotion, scrubs for luxurious self-care',
      emoji: '🛁',
      count: '75+ products',
      color: 'from-amber-400 to-orange-400',
      subcategories: ['Body Wash', 'Body Lotion', 'Body Scrub', 'Hand Cream', 'Bath Bombs']
    },
    {
      name: 'Tools & Brushes',
      description: 'Makeup brushes, beauty tools for professional application',
      emoji: '🪞',
      count: '30+ products',
      color: 'from-gray-400 to-gray-600',
      subcategories: ['Makeup Brushes', 'Beauty Blenders', 'Tweezers', 'Eyelash Curlers', 'Mirrors']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop By Category</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our complete range of beauty products organized by category. 
            Find exactly what you need for your beauty routine.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to={`/products?category=${category.name.toLowerCase()}`}>
              <Card hover className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl`}>
                    {category.emoji}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-4 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="text-center mb-4">
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {category.count}
                    </span>
                  </div>

                  {/* Subcategories */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {category.subcategories.slice(0, 4).map((subcategory, subIndex) => (
                      <span
                        key={subIndex}
                        className="inline-block bg-rose-50 text-rose-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {subcategory}
                      </span>
                    ))}
                    {category.subcategories.length > 4 && (
                      <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        +{category.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our beauty experts are here to help you find the perfect products for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="premium">
                Browse All Products
              </Button>
            </Link>
            <Button variant="outline">
              Contact Beauty Advisor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;