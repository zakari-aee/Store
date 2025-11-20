import React from 'react';
import { Star, Sparkles, Shield, Truck, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProductGrid from '../components/product/ProductGrid';
import { getFeaturedProducts, getNewProducts, categoryProducts } from '../data/mockData';

// Import the store image
import storeImage from '../img/store.jpg';

const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  const benefits = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Authentic products with quality assurance and warranties'
    },
    {
      icon: Sparkles,
      title: 'Premium Brands',
      description: 'Curated selection of top international beauty brands'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick shipping across Morocco and international orders'
    }
  ];

  const categories = [
    { 
      name: 'Skincare', 
      emoji: '✨', 
      count: `${categoryProducts.Skincare.length}+ products`, 
      color: 'from-blue-400 to-cyan-400' 
    },
    { 
      name: 'Makeup', 
      emoji: '💄', 
      count: `${categoryProducts.Makeup.length}+ products`, 
      color: 'from-rose-400 to-pink-400' 
    },
    { 
      name: 'Haircare', 
      emoji: '👩‍🦰', 
      count: `${categoryProducts.Haircare.length}+ products`, 
      color: 'from-purple-400 to-indigo-400' 
    },
    { 
      name: 'Fragrance', 
      emoji: '🌸', 
      count: `${categoryProducts.Fragrance.length}+ products`, 
      color: 'from-green-400 to-emerald-400' 
    }
  ];

  const testimonials = [
    {
      name: 'Fatima Z.',
      role: 'Beauty Salon Owner',
      content: 'El Hilali Cosmetics has been my trusted supplier for years. Their bulk prices help my business grow!',
      rating: 5
    },
    {
      name: 'Leila M.',
      role: 'Makeup Artist',
      content: 'Professional quality products at amazing prices. My clients always love the results.',
      rating: 5
    },
    {
      name: 'Yasmine K.',
      role: 'Loyal Customer',
      content: 'The best cosmetics store in Morocco! Authentic products and excellent customer service.',
      rating: 5
    }
  ];


  const handleShopProducts = () => {
    navigate('/products');
  };

  const handleViewCategories = () => {
    navigate('/categories');
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Trusted since 2016 - Over 10,000 satisfied customers
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent block"> El Hilali Cosmetics</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Your trusted beauty destination in Morocco. Discover authentic cosmetics, skincare, and fragrance products with exclusive bulk pricing for businesses and individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="large" 
                  variant="premium" 
                  className="justify-center"
                  onClick={handleShopProducts}
                >
                  Shop Products
                  <ArrowRight size={20} />
                </Button>
                <Button 
                  size="large" 
                  variant="outline" 
                  className="justify-center"
                  onClick={handleViewCategories}
                >
                  View Categories
                </Button>
              </div>
              
              {/* Store Info */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={16} className="text-rose-500" />
                  <span>Meknes, Morocco</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone size={16} className="text-rose-500" />
                  <span>+212 522-XXX-XXX</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={16} className="text-rose-500" />
                  <span>Open 10AM - 11PM</span>
                </div>
              </div>
            </div>
            
            {/* Store Image Section */}
            <div className="relative">
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-6 aspect-square flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
                {/* Store Image */}
                  <img 
                    src={storeImage} 
                    alt="El Hilali Cosmetics Store" 
                    className="w-full h-full object-cover rounded-2xl"
                  />                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose El Hilali Cosmetics?</h2>
            <p className="text-gray-600 text-lg">Experience the difference with our premium service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Customer favorites with exclusive bulk pricing</p>
          </div>
          
          <ProductGrid products={featuredProducts} columns={2} className="mb-8" />
          
          <div className="text-center">
            <Button 
              variant="premium" 
              size="large" 
              className="justify-center"
              onClick={handleShopProducts}
            >
              View All Products
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for in our extensive collection</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="text-left"
              >
                <Card hover className="text-center p-6 border-0 bg-white hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl`}>
                    {category.emoji}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-gray-600 text-lg">Fresh products just arrived in store</p>
          </div>
          
          <ProductGrid products={newProducts} columns={2} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Join thousands of satisfied customers across Morocco</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 text-center border-0 bg-white shadow-sm">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-amber-400 fill-current mx-1" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Store Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Store</h2>
              <p className="text-rose-100 text-lg mb-6">
                Experience the El Hilali Cosmetics difference in person. Our knowledgeable staff will help you find the perfect products for your needs.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-rose-200" />
                  <span>123 Beauty Street, Casablanca, Morocco</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-rose-200" />
                  <span>+212 522-XXX-XXX</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-rose-200" />
                  <span>Monday - Saturday: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="large" 
                className="bg-white text-rose-600 hover:bg-gray-100"
                onClick={() => window.open('https://maps.google.com', '_blank')}
              >
                Get Directions
              </Button>
            </div>
            
            {/* Store Image in Visit Store Section */}
            <div className="bg-white/10 rounded-2xl p-6 text-center overflow-hidden">
              <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                <img 
                  src={storeImage} 
                  alt="El Hilali Cosmetics Store Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">El Hilali Cosmetics</h3>
              <p className="text-rose-100 mb-4">Your Beauty Destination</p>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="font-semibold">Special Offer for New Customers!</p>
                <p className="text-sm text-rose-100">Get 15% off your first purchase in-store</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience El Hilali Cosmetics?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're shopping for personal use or bulk orders for your business, we have the perfect beauty solutions for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="large" 
              className="justify-center"
              onClick={handleShopProducts}
            >
              Shop Online Now
            </Button>
            <Button 
              variant="outline" 
              size="large" 
              className="justify-center border-rose-500 text-rose-600 hover:bg-rose-50"
              onClick={() => window.open('tel:+212522XXXXXX')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;