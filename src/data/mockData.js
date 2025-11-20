export const mockProducts = [
  {
    id: 1,
    name: "Matte Liquid Lipstick - Ruby Woo",
    brand: "MAC",
    price: 19.99,
    originalPrice: 24.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    category: "Makeup",
    subcategory: "Lipstick",
    rating: 4.8,
    featured: true,
    isNew: false,
    discount: 20,
    description: "Long-lasting matte liquid lipstick with intense color payoff"
  },
  {
    id: 2,
    name: "Hydrating Face Serum",
    brand: "La Roche-Posay",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    category: "Skincare",
    subcategory: "Serum",
    rating: 4.6,
    featured: true,
    isNew: true,
    description: "Lightweight serum with hyaluronic acid for deep hydration"
  },
  {
    id: 3,
    name: "Volume Boost Mascara",
    brand: "L'Oreal",
    price: 14.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    category: "Makeup",
    subcategory: "Mascara",
    rating: 4.4,
    featured: false,
    isNew: true,
    discount: 25,
    description: "Volumizing mascara for dramatic lashes"
  },
  {
    id: 4,
    name: "Repairing Hair Mask",
    brand: "Olaplex",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
    category: "Haircare",
    subcategory: "Hair Mask",
    rating: 4.9,
    featured: true,
    isNew: false,
    description: "Intensive repairing treatment for damaged hair"
  },
  {
    id: 5,
    name: "Floral Eau de Parfum",
    brand: "Chanel",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    category: "Fragrance",
    subcategory: "Perfume",
    rating: 4.7,
    featured: false,
    isNew: true,
    description: "Elegant floral fragrance with lasting scent"
  },
  {
    id: 6,
    name: "Makeup Brush Set",
    brand: "Morphe",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
    category: "Tools & Brushes",
    subcategory: "Brush Set",
    rating: 4.5,
    featured: true,
    isNew: false,
    discount: 30,
    description: "Professional 12-piece makeup brush collection"
  }
];

export const categories = [
  {
    name: "Skincare",
    subcategories: ["Cleansers", "Moisturizers", "Serums", "Masks", "Sunscreen", "Toners"]
  },
  {
    name: "Makeup",
    subcategories: ["Foundation", "Concealer", "Lipstick", "Mascara", "Eyeshadow", "Blush"]
  },
  {
    name: "Haircare",
    subcategories: ["Shampoo", "Conditioner", "Hair Mask", "Hair Oil", "Styling", "Treatment"]
  },
  {
    name: "Fragrance",
    subcategories: ["Perfume", "Body Spray", "Roll-on", "Sample Set", "Home Fragrance"]
  },
  {
    name: "Bath & Body",
    subcategories: ["Body Wash", "Body Lotion", "Body Scrub", "Hand Cream", "Bath Bombs"]
  },
  {
    name: "Tools & Brushes",
    subcategories: ["Makeup Brushes", "Beauty Blenders", "Tweezers", "Eyelash Curlers", "Mirrors"]
  }
];