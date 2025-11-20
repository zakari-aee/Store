import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = {
    shop: [
      'Skincare',
      'Makeup',
      'Haircare',
      'Fragrance',
      'Bath & Body',
      'Tools & Brushes'
    ],
    help: [
      'Contact Us',
      'Shipping Info',
      'Returns & Exchanges',
      'FAQ',
      'Track Order'
    ],
    about: [
      'Our Story',
      'Sustainability',
      'Careers',
      'Press',
      'Affiliates'
    ],
    policies: [
      'Privacy Policy',
      'Terms of Service',
      'Accessibility',
      'Cookie Policy'
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Newsletter' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Glamour Community
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to receive updates, access to exclusive deals, and be the first to know about new arrivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button className="bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
              <span className="text-xl font-bold text-gray-900">Glamour</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Premium cosmetics for the modern beauty enthusiast. Quality, sustainability, and innovation in every product.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 transition-colors"
                  >
                    <Icon size={18} className="text-gray-600" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerSections.shop.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Help</h4>
            <ul className="space-y-2">
              {footerSections.help.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              {footerSections.about.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>📞 1-800-GLAMOUR</p>
              <p>✉️ help@glamour.com</p>
              <p>🕒 Mon-Fri: 9AM-6PM EST</p>
              <div className="pt-4">
                <p className="font-medium text-gray-900 mb-2">Secure Payment</p>
                <div className="flex space-x-2">
                  {['💳', '🔒', '📱'].map((icon, index) => (
                    <span key={index} className="text-lg">{icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {footerSections.policies.map((policy) => (
                <a key={policy} href="#" className="hover:text-rose-600 transition-colors">
                  {policy}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              © 2024 Glamour Cosmetics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;