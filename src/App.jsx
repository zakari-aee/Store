import React, { useState } from "react";
import { Heart, Star, ShoppingBag } from "lucide-react";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Modal from "./components/ui/Modal";
import Carousel from "./components/ui/Carousel";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Mock product data
  const featuredProducts = [
    {
      id: 1,
      name: "Matte Liquid Lipstick - Rose Nude",
      brand: "LUXE COSMETICS",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
      rating: 4.8,
      description: "Long-lasting, weightless matte finish with intense color payoff."
    },
    {
      id: 2,
      name: "Hydrating Face Serum",
      brand: "GLOW SKINCARE",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
      rating: 4.9,
      description: "Vitamin C enriched serum for radiant, hydrated skin."
    },
    {
      id: 3,
      name: "Volume Boost Mascara",
      brand: "LASH PERFECTION",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      rating: 4.7,
      description: "Dramatic volume without clumps or flakes."
    }
  ];

  const carouselImages = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Discover Your Radiance
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Premium cosmetics crafted with care. Experience luxury in every product.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="large" variant="premium">
              Shop Collection
            </Button>
            <Button size="large" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Curated selection of our best sellers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} hover className="overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
                    onClick={() => setIsQuickViewOpen(true)}
                  >
                    <Heart size={18} className="text-gray-600" />
                  </button>
                </div>
                
                <Card.Content className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-rose-600 font-medium">{product.brand}</span>
                    <div className="flex items-center text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <Button 
                      size="small" 
                      variant="primary"
                      icon={ShoppingBag}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add to Bag
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New Collection</h2>
            <p className="text-gray-600">Discover our latest arrivals</p>
          </div>
          
          <Carousel autoPlay interval={4000} className="h-96 rounded-2xl overflow-hidden">
            {carouselImages.map((src, index) => (
              <Carousel.Item key={index}>
                <img 
                  src={src} 
                  alt={`Collection ${index + 1}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-4xl font-bold mb-4">Spring Collection 2024</h3>
                    <Button variant="primary" size="large">
                      Explore Now
                    </Button>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Beauty Community
          </h2>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive offers, early access to new products, and beauty tips from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-rose-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <Button variant="primary" size="large" className="bg-white text-rose-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Product Added to Bag"
        size="small"
      >
        <Modal.Content>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Added Successfully!</h3>
            <p className="text-gray-600 mb-6">Your product has been added to the shopping bag.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Continue Shopping
              </Button>
              <Button variant="primary">
                View Bag
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>

      {/* Quick View Modal */}
      <Modal 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)}
        size="large"
      >
        <Modal.Content className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
                alt="Product"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Matte Liquid Lipstick</h2>
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 mr-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(128 reviews)</span>
              </div>
              <p className="text-gray-600 mb-6">
                Experience our weightless matte liquid lipstick with intense color payoff 
                and all-day comfort. Enriched with vitamin E and avocado oil.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shade</span>
                  <span className="font-medium text-gray-900">Rose Nude</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Finish</span>
                  <span className="font-medium text-gray-900">Matte</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-gray-900">$24.99</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="small">-</Button>
                  <span className="px-4">1</span>
                  <Button variant="outline" size="small">+</Button>
                </div>
              </div>
              <Button variant="premium" icon={ShoppingBag} className="w-full justify-center">
                Add to Shopping Bag
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default App;