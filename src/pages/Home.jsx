import React from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { mockProducts } from '../data/mockData';

const Home = () => {
  const featuredProducts = mockProducts.filter(product => product.featured);
  const newArrivals = mockProducts.filter(product => product.isNew);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Discover Your Beauty</h1>
          <p className="text-xl mb-8">Premium cosmetics for every skin type and tone</p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Bath & Body', 'Tools'].map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition duration-200 cursor-pointer">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-gray-800">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Summer Sale!</h2>
          <p className="text-xl text-gray-600 mb-6">Up to 50% off on selected items</p>
          <button className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition duration-200">
            Explore Deals
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;