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
    <footer className="bg-gray-50 text-gray-700">
      {/* Newsletter Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Join the El Hilali Cosmetics Community
          </h3>
          <p className="text-gray-600 mb-5 px-2 sm:px-0">
            Subscribe for updates, exclusive deals, and be the first to know about new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <button className="bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
              <span className="text-xl font-bold text-gray-900">El Hilali Cosmetics</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Premium cosmetics for modern beauty enthusiasts. Quality, sustainability, and innovation in every product.
            </p>
            <div className="flex space-x-3">
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

          {/* Footer Links */}
          {['shop', 'help', 'about', 'contact'].map((section, idx) => {
            if (section === 'contact') {
              return (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📞 1-800-HILALI</p>
                    <p>✉️ help@elhilali.com</p>
                    <p>🕒 Mon-Fri: 9AM-6PM</p>
                    <div className="pt-3">
                      <p className="font-medium text-gray-900 mb-1">Secure Payment</p>
                      <div className="flex space-x-2 text-lg">
                        {['💳', '🔒', '📱'].map((icon, i) => <span key={i}>{icon}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={idx}>
                  <h4 className="font-semibold text-gray-900 mb-4 capitalize">{section}</h4>
                  <ul className="space-y-2">
                    {footerSections[section].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-gray-600 hover:text-rose-600 text-sm transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 space-y-3 md:space-y-0">
          <div className="flex flex-wrap justify-center gap-6">
            {footerSections.policies.map((policy) => (
              <a key={policy} href="#" className="hover:text-rose-600 transition-colors">
                {policy}
              </a>
            ))}
          </div>
          <p>© 2024 El Hilali Cosmetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
