import React from 'react';
import Link from 'next/link';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { useSettings } from '@/contexts/SettingsContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    products: [
      { name: 'Power Tools', href: '/products?category=power-tools' },
      { name: 'Hand Tools', href: '/products?category=hand-tools' },
      { name: 'Safety Equipment', href: '/products?category=safety' },
      { name: 'All Products', href: '/products' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Warranty', href: '/warranty' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: '📘' },
    { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-bold text-white">{settings?.siteName || 'Your Business'}</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {settings?.siteDescription || 'Your trusted partner for high-quality tools and equipment. We provide professional-grade solutions for all your business needs.'}
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-primary-400 mr-3" />
                <span className="text-gray-300">
                  {settings?.contactAddress || '123 Business Street, Nairobi, Kenya'}
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-primary-400 mr-3" />
                <span className="text-gray-300">{settings?.contactPhone || '+254 700 123 456'}</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-primary-400 mr-3" />
                <span className="text-gray-300">{settings?.contactEmail || 'info@didobusiness.com'}</span>
              </div>
              <div className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-primary-400 mr-3" />
                <span className="text-gray-300">www.didobusiness.com</span>
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4">Stay updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="mx-3 text-gray-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Social links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="text-gray-400 text-sm">
              © {currentYear} {settings?.siteName || 'Your Business'}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
