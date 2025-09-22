import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';
import { 
  ShieldCheckIcon, 
  TruckIcon, 
  StarIcon, 
  PhoneIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const WhyChooseUs: React.FC = () => {
  const { settings } = useSettings();
  
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Quality Guaranteed',
      description: 'All our products come with manufacturer warranties and our quality guarantee. We stand behind every tool we sell.',
      color: 'text-blue-600'
    },
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Same-day shipping on orders placed before 2 PM. Get your tools when you need them most.',
      color: 'text-green-600'
    },
    {
      icon: StarIcon,
      title: 'Expert Service',
      description: 'Our team of tool specialists is here to help you find the right equipment for your specific needs.',
      color: 'text-yellow-600'
    },
    {
      icon: PhoneIcon,
      title: '24/7 Support',
      description: 'Need help? Our customer support team is available around the clock to assist you with any questions.',
      color: 'text-purple-600'
    },
    {
      icon: UserGroupIcon,
      title: 'Trusted by Professionals',
      description: 'Over 1000+ contractors and businesses trust us for their tool and equipment needs.',
      color: 'text-red-600'
    },
    {
      icon: ClockIcon,
      title: '5+ Years Experience',
      description: 'With years of experience in the industry, we know tools and we know what works.',
      color: 'text-indigo-600'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Happy Customers', suffix: '' },
    { number: '500+', label: 'Products Available', suffix: '' },
    { number: '99.8', label: 'Customer Satisfaction', suffix: '%' },
    { number: '24/7', label: 'Customer Support', suffix: '' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose {settings?.siteName || 'Dido Business'}?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            We're more than just a tool supplier. We're your partner in success, providing quality products 
            and exceptional service that keeps your business running smoothly.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gray-50 ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-primary-600 rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Our Track Record Speaks for Itself
            </h3>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              Numbers don't lie. Here's what we've achieved together with our amazing customers.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-primary-100 text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-white rounded-xl p-8 shadow-md"
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-8 w-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl lg:text-2xl text-gray-700 font-medium mb-6 italic">
              "{settings?.siteName || 'Dido Business'} has been our go-to supplier for over 3 years. Their quality products and 
              exceptional customer service have helped us complete projects on time and within budget."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-primary-600 font-bold text-lg">JM</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">John Mwangi</div>
                <div className="text-gray-600">Construction Manager, BuildRight Ltd</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
