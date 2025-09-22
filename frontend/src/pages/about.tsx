import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout/Layout';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function AboutPage() {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Your Business';

  const features = [
    'High-quality tools and equipment',
    'Competitive pricing',
    'Expert customer service',
    'Fast and reliable delivery',
    'Comprehensive warranty coverage',
    'Professional technical support'
  ];

  const stats = [
    { label: 'Years in Business', value: '15+' },
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Products Available', value: '5,000+' },
    { label: 'Expert Team Members', value: '50+' }
  ];

  return (
    <>
      <NextSeo
        title={`About Us - ${businessName}`}
        description="Learn about our company, our mission, and our commitment to providing quality tools and equipment for all your needs."
        canonical={`${process.env.NEXT_PUBLIC_CLIENT_URL}/about`}
      />

      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  About {businessName}
                </h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Your trusted partner for quality tools, equipment, and professional solutions. 
                  We've been serving customers with excellence for over a decade.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <p className="mb-4">
                    Founded with a vision to provide high-quality tools and equipment to professionals 
                    and DIY enthusiasts alike, {businessName} has grown from a small local supplier 
                    to a trusted name in the industry.
                  </p>
                  <p className="mb-4">
                    Our commitment to excellence, competitive pricing, and outstanding customer service 
                    has earned us the trust of thousands of customers. We understand that having the 
                    right tools is essential for getting the job done right.
                  </p>
                  <p>
                    Whether you're a professional contractor, a weekend warrior, or someone who simply 
                    appreciates quality tools, we're here to help you find exactly what you need.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                  {/* CSS-based illustration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-blue-600 rounded-lg mb-4 mx-auto flex items-center justify-center shadow-lg">
                        <div className="text-white text-4xl">🏭</div>
                      </div>
                      <div className="text-blue-800 font-semibold text-lg">Our Facilities</div>
                      <div className="text-blue-600 text-sm mt-2">Modern workshop & warehouse</div>
                    </div>
                  </div>
                  {/* Background elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
                  <div className="absolute top-12 right-8 w-6 h-6 bg-purple-300 rounded-full opacity-50"></div>
                  <div className="absolute bottom-8 left-12 w-4 h-4 bg-indigo-300 rounded-full opacity-50"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-blue-200 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            {/* Mission & Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide our customers with the highest quality tools and equipment at competitive 
                  prices, backed by exceptional service and support. We strive to be your go-to 
                  resource for all your tool and equipment needs.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-blue-600 rounded-2xl py-12 px-8 mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-blue-100">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Why Choose {businessName}?
              </h2>
              
              {/* Feature Image */}
              <div className="mb-12 max-w-4xl mx-auto">
                <div className="relative h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex space-x-8 items-center">
                      {/* Team Icon */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white text-2xl">👥</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">Expert Team</div>
                      </div>
                      
                      {/* Tools Icon */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white text-2xl">🛠️</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">Quality Tools</div>
                      </div>
                      
                      {/* Service Icon */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                          <span className="text-white text-2xl">⭐</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">Trusted Service</div>
                      </div>
                    </div>
                  </div>
                  {/* Background decoration */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-blue-200 rounded-full"></div>
                  <div className="absolute top-8 right-12 w-2 h-2 bg-green-200 rounded-full"></div>
                  <div className="absolute bottom-6 left-8 w-4 h-4 bg-purple-200 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
                  <p className="text-gray-600">
                    We source only the best tools and equipment from trusted manufacturers 
                    to ensure reliability and durability.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                  <p className="text-gray-600">
                    We offer competitive prices without compromising on quality, 
                    giving you the best value for your money.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
                  <p className="text-gray-600">
                    Our knowledgeable team is here to help you choose the right tools 
                    and provide ongoing support when you need it.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 rounded-2xl py-12 px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Browse our extensive catalog of tools and equipment, or get in touch with our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Products
                </a>
                <a
                  href="/contact"
                  className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
