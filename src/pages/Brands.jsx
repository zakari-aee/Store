import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';

const Brands = () => {
  const brands = [
    {
      name: 'MAC Cosmetics',
      description: 'Professional makeup loved by artists worldwide',
      logo: 'M',
      productCount: '45 products',
      rating: 4.8,
      category: 'Makeup',
      color: 'from-red-400 to-pink-500',
      featured: true
    },
    {
      name: 'La Roche-Posay',
      description: 'Dermatologist-recommended skincare solutions',
      logo: 'LRP',
      productCount: '32 products',
      rating: 4.9,
      category: 'Skincare',
      color: 'from-blue-400 to-cyan-500',
      featured: true
    },
    {
      name: 'L\'Oreal Paris',
      description: 'Affordable luxury for everyday beauty',
      logo: 'L',
      productCount: '68 products',
      rating: 4.6,
      category: 'Makeup & Haircare',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      name: 'Olaplex',
      description: 'Revolutionary hair repair and protection',
      logo: 'O',
      productCount: '15 products',
      rating: 4.9,
      category: 'Haircare',
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Estee Lauder',
      description: 'Timeless luxury and innovation',
      logo: 'EL',
      productCount: '28 products',
      rating: 4.7,
      category: 'Skincare & Makeup',
      color: 'from-amber-400 to-orange-400'
    },
    {
      name: 'Clinique',
      description: 'Allergy-tested, 100% fragrance-free skincare',
      logo: 'C',
      productCount: '41 products',
      rating: 4.8,
      category: 'Skincare',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Nyx Professional',
      description: 'Professional quality at an affordable price',
      logo: 'NYX',
      productCount: '52 products',
      rating: 4.5,
      category: 'Makeup',
      color: 'from-pink-400 to-rose-500'
    },
    {
      name: 'Maybelline',
      description: 'Makeup innovation for every beauty',
      logo: 'M',
      productCount: '61 products',
      rating: 4.4,
      category: 'Makeup',
      color: 'from-rose-400 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Brands</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover premium beauty brands trusted by professionals and beauty enthusiasts worldwide. 
            Each brand brings unique innovation and quality to our collection.
          </p>
        </div>

        {/* Featured Brands */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brands.filter(brand => brand.featured).map((brand, index) => (
              <Link key={index} to={`/products?brand=${brand.name.toLowerCase()}`}>
                <Card hover className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${brand.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {brand.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {brand.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {brand.description}
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-gray-400 mt-1" />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{brand.productCount}</span>
                          <span>•</span>
                          <span>{brand.category}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Star size={14} className="text-amber-400 fill-current" />
                            <span>{brand.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* All Brands */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <Link key={index} to={`/products?brand=${brand.name.toLowerCase()}`}>
                <Card hover className="text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${brand.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl`}>
                      {brand.logo}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {brand.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {brand.description}
                    </p>
                    
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-600 mb-3">
                      <span>{brand.productCount}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Star size={12} className="text-amber-400 fill-current" />
                        <span>{brand.rating}</span>
                      </div>
                    </div>
                    
                    <div className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {brand.category}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Interested in Becoming a Partner Brand?</h2>
            <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
              Join our curated collection of premium beauty brands and reach thousands of beauty enthusiasts.
            </p>
            <Button variant="primary" className="bg-white text-rose-600 hover:bg-gray-100">
              Contact Partnerships
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;