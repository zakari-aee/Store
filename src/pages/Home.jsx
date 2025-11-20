import React from 'react';
import { Star, Sparkles, Shield, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Carousel from '../components/ui/Carousel';
import ProductGrid from '../components/product/ProductGrid';
import { getFeaturedProducts, getNewProducts, categoryProducts } from '../data/mockData';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  const benefits = [
    {
      icon: Shield,
      title: 'Clean Beauty',
      description: 'Cruelty-free, vegan formulas with clean ingredients'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Luxury formulas with proven results'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50'
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
      name: 'Sarah M.',
      role: 'Beauty Blogger',
      content: 'The products are incredible! High quality and amazing prices.',
      rating: 5
    },
    {
      name: 'Jessica T.',
      role: 'Makeup Artist',
      content: 'Professional quality at an amazing price. My go-to for clients.',
      rating: 5
    },
    {
      name: 'Alexandra K.',
      role: 'Skincare Enthusiast',
      content: 'The skincare products transformed my skin in just two weeks!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Premium
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent"> Cosmetics</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                Discover professional beauty products with bulk pricing. Quality meets affordability in every product.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="large" variant="premium" className="justify-center">
                    Shop All Products
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="large" variant="outline" className="justify-center">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">💄</div>
                  <p className="text-xl font-semibold">Bulk Pricing Available</p>
                  <p className="text-rose-100 mt-2">Save up to 40% on bulk orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Customer favorites with amazing bulk discounts</p>
          </div>
          
          <ProductGrid products={featuredProducts} columns={2} className="mb-8" />
          
          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="large" className="justify-center">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to={`/products?category=${category.name.toLowerCase()}`}>
                <Card hover className="text-center p-6 border-0 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl`}>
                    {category.emoji}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-gray-600 text-lg">Fresh off the shelf - discover what's new</p>
          </div>
          
          <ProductGrid products={newProducts} columns={2} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Beauty Enthusiasts</h2>
            <p className="text-gray-600 text-lg">See what our customers are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-sm">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Beauty?
          </h2>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience premium cosmetics with amazing bulk pricing. 
            Free shipping on orders over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="primary" size="large" className="bg-white text-rose-600 hover:bg-gray-100 justify-center">
                Shop Now
              </Button>
            </Link>
            <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-rose-600 justify-center">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;