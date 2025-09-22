import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  specialties: string[];
  experience: string;
}

export default function TeamPage() {
  const { settings } = useSettings();
  const businessName = settings?.siteName || 'Your Business';

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'General Manager',
      department: 'Management',
      bio: 'Sarah leads our team with over 12 years of experience in the tools and equipment industry. She ensures we deliver exceptional service and quality products to all our customers.',
      image: '/images/team/sarah-johnson.jpg',
      email: 'sarah@company.com',
      phone: '+1 (555) 123-4567',
      specialties: ['Team Leadership', 'Business Strategy', 'Customer Relations'],
      experience: '12+ years'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Technical Specialist',
      department: 'Technical Support',
      bio: 'Michael is our go-to expert for technical questions and product recommendations. With a background in mechanical engineering, he helps customers find the right tools for their projects.',
      image: '/images/team/michael-chen.jpg',
      email: 'michael@company.com',
      specialties: ['Power Tools', 'Industrial Equipment', 'Technical Consulting'],
      experience: '8+ years'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Sales Manager',
      department: 'Sales',
      bio: 'Emily oversees our sales operations and works directly with customers to understand their needs. She specializes in bulk orders and commercial accounts.',
      image: '/images/team/emily-rodriguez.jpg',
      email: 'emily@company.com',
      specialties: ['B2B Sales', 'Account Management', 'Product Knowledge'],
      experience: '6+ years'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Inventory Manager',
      department: 'Operations',
      bio: 'David ensures we always have the right products in stock when you need them. He manages our supply chain and works with suppliers to maintain quality standards.',
      image: '/images/team/david-thompson.jpg',
      email: 'david@company.com',
      specialties: ['Inventory Management', 'Supply Chain', 'Quality Control'],
      experience: '10+ years'
    },
    {
      id: 5,
      name: 'Lisa Park',
      position: 'Customer Service Lead',
      department: 'Customer Service',
      bio: 'Lisa leads our customer service team and ensures every customer inquiry is handled promptly and professionally. She\'s passionate about customer satisfaction.',
      image: '/images/team/lisa-park.jpg',
      email: 'lisa@company.com',
      specialties: ['Customer Support', 'Problem Resolution', 'Training'],
      experience: '7+ years'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      position: 'Safety Coordinator',
      department: 'Safety & Training',
      bio: 'Robert ensures all our products meet safety standards and provides training on proper tool usage. Safety is his top priority in everything we do.',
      image: '/images/team/robert-martinez.jpg',
      email: 'robert@company.com',
      specialties: ['Safety Training', 'Compliance', 'Risk Assessment'],
      experience: '9+ years'
    }
  ];

  const departments = [
    { name: 'Management', count: teamMembers.filter(m => m.department === 'Management').length },
    { name: 'Sales', count: teamMembers.filter(m => m.department === 'Sales').length },
    { name: 'Technical Support', count: teamMembers.filter(m => m.department === 'Technical Support').length },
    { name: 'Operations', count: teamMembers.filter(m => m.department === 'Operations').length },
    { name: 'Customer Service', count: teamMembers.filter(m => m.department === 'Customer Service').length },
    { name: 'Safety & Training', count: teamMembers.filter(m => m.department === 'Safety & Training').length },
  ];

  return (
    <>
      <NextSeo
        title={`Our Team - ${businessName}`}
        description={`Meet the dedicated team at ${businessName}. Our experienced professionals are here to help you find the right tools and equipment for your needs.`}
        canonical={`${process.env.NEXT_PUBLIC_CLIENT_URL}/team`}
      />

      <Layout>
        <div className="bg-white">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-gray-900 mb-4"
                >
                  Meet Our Team
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  Our experienced professionals are dedicated to providing you with expert advice, 
                  quality products, and exceptional service for all your tool and equipment needs.
                </motion.p>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {departments.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{dept.count}</div>
                      <div className="text-sm text-gray-600">{dept.name}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Profile Image */}
                    <div className="aspect-w-3 aspect-h-3 bg-gray-200">
                      <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                        <p className="text-sm text-gray-500">{member.department}</p>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>

                      {/* Experience & Specialties */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">{member.experience} experience</span>
                        </div>
                        <div className="flex items-start">
                          <AcademicCapIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.slice(0, 2).map((specialty, idx) => (
                              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {specialty}
                              </span>
                            ))}
                            {member.specialties.length > 2 && (
                              <span className="text-xs text-gray-500">+{member.specialties.length - 2} more</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex space-x-3">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                          title={`Email ${member.name}`}
                        >
                          <EnvelopeIcon className="h-4 w-4" />
                        </a>
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                            title={`Call ${member.name}`}
                          >
                            <PhoneIcon className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Join Our Team CTA */}
          <div className="py-16 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Join Our Growing Team
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  We're always looking for passionate professionals who share our commitment to quality and customer service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/careers"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    View Open Positions
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Contact HR
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}