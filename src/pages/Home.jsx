import React from 'react';
import { Star, Heart, ShoppingBag, Sparkles, Shield, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Carousel from '../components/ui/Carousel';
import ProductCard from '../components/product/ProductCard';
import { mockProducts } from '../data/mockData';

const Home = () => {
  const featuredProducts = mockProducts.filter(product => product.featured);
  const newArrivals = mockProducts.filter(product => product.isNew);

  const benefits = [
    {
      icon: Shield,
      title: 'Clean Beauty',
      description: 'All our products are cruelty-free and made with clean ingredients'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Luxury formulas with proven results and superior performance'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50 with 3 free samples'
    }
  ];

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200',
      title: 'Summer Collection 2024',
      subtitle: 'Fresh, radiant looks for the sunny days ahead',
      buttonText: 'Explore Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200',
      title: 'Luxury Skincare',
      subtitle: 'Premium formulas for glowing, healthy skin',
      buttonText: 'Shop Skincare'
    },
    {
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200',
      title: 'New Arrivals',
      subtitle: 'Discover our latest product innovations',
      buttonText: 'View New'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel autoPlay interval={5000} showDots={true} showArrows={true} className="h-[600px]">
          {carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div 
                className="w-full h-[600px] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-2xl mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">{item.title}</h1>
                    <p className="text-xl mb-8 opacity-90">{item.subtitle}</p>
                    <Button size="large" variant="premium">
                      {item.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Customer favorites and best sellers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="large">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-gray-600 text-lg">Fresh off the shelf - discover what's new</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop By Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Skincare', emoji: '✨', count: '120+ products' },
              { name: 'Makeup', emoji: '💄', count: '85+ products' },
              { name: 'Haircare', emoji: '👩‍🦰', count: '60+ products' },
              { name: 'Fragrance', emoji: '🌸', count: '45+ products' },
              { name: 'Bath & Body', emoji: '🛁', count: '75+ products' },
              { name: 'Tools', emoji: '🪞', count: '30+ products' }
            ].map((category, index) => (
              <Card key={index} hover className="text-center p-6">
                <div className="text-3xl mb-3">{category.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Beauty Enthusiasts</h2>
            <p className="text-gray-600 text-lg">See what our customers are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                role: 'Beauty Blogger',
                content: 'The matte lipstick is incredible! Long-lasting and comfortable.',
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
                content: 'The serum transformed my skin in just two weeks!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-current" />
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
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Discover Your Beauty?
          </h2>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the Glamour difference. 
            Free samples with every order and free shipping over $50.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large" className="bg-white text-rose-600 hover:bg-gray-100">
              Shop Now
            </Button>
            <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-rose-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;