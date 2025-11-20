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
          {['shop', 'help', 'about'].map((section, idx) => (
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
          ))}
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
          <p>© 2025 El Hilali Cosmetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
