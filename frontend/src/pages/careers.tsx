import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { motion } from 'framer-motion';
import { 
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
}

export default function CareersPage() {
  const { settings } = useSettings();
  const businessName = settings?.siteName || 'Your Business';

  const jobListings: JobListing[] = [
    {
      id: 1,
      title: 'Sales Associate',
      department: 'Sales',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      salary: 'KES 40,000 - 60,000',
      description: 'We are looking for an enthusiastic Sales Associate to join our team. You will be responsible for helping customers find the right tools and equipment for their needs while providing excellent customer service.',
      requirements: [
        'High school diploma or equivalent',
        '1-2 years of retail or sales experience',
        'Strong communication and interpersonal skills',
        'Basic knowledge of tools and equipment (preferred)',
        'Ability to lift up to 50 lbs'
      ],
      benefits: [
        'Competitive salary with commission',
        'Health insurance',
        'Paid time off',
        'Employee discounts',
        'Training and development opportunities'
      ],
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Technical Support Specialist',
      department: 'Technical Support',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      salary: 'KES 60,000 - 80,000',
      description: 'Join our technical support team to help customers with product questions, troubleshooting, and recommendations. This role requires strong technical knowledge and problem-solving skills.',
      requirements: [
        'Diploma or degree in Engineering or related field',
        '2-3 years of technical support experience',
        'Strong knowledge of power tools and industrial equipment',
        'Excellent problem-solving skills',
        'Computer proficiency'
      ],
      benefits: [
        'Competitive salary',
        'Health and dental insurance',
        'Professional development budget',
        'Flexible working hours',
        'Performance bonuses'
      ],
      postedDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Warehouse Assistant',
      department: 'Operations',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      salary: 'KES 30,000 - 40,000',
      description: 'We need a reliable Warehouse Assistant to help with receiving, storing, and shipping products. This is a great entry-level position with opportunities for growth.',
      requirements: [
        'High school diploma',
        'Physical ability to lift and move heavy items',
        'Attention to detail',
        'Basic computer skills',
        'Reliable and punctual'
      ],
      benefits: [
        'Competitive starting salary',
        'Health insurance after 3 months',
        'Paid training',
        'Growth opportunities',
        'Safe working environment'
      ],
      postedDate: '2024-01-12'
    }
  ];

  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: 'Competitive Compensation',
      description: 'We offer competitive salaries with performance-based bonuses and regular reviews.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Comprehensive Benefits',
      description: 'Health insurance, paid time off, and employee discounts on all products.'
    },
    {
      icon: BriefcaseIcon,
      title: 'Career Growth',
      description: 'Clear advancement paths with training and development opportunities.'
    },
    {
      icon: ClockIcon,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and a supportive work environment that values your time.'
    }
  ];

  return (
    <>
      <NextSeo
        title={`Careers - ${businessName}`}
        description={`Join the ${businessName} team! Explore career opportunities in sales, technical support, operations, and more. We offer competitive compensation and growth opportunities.`}
        canonical={`${process.env.NEXT_PUBLIC_CLIENT_URL}/careers`}
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
                  Join Our Team
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  Build your career with {businessName}. We're looking for passionate individuals 
                  who want to make a difference in the tools and equipment industry.
                </motion.p>
              </div>
            </div>
          </div>

          {/* Why Work With Us */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We believe our employees are our greatest asset. That's why we invest in creating 
                  a positive work environment with excellent benefits and growth opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
                <p className="text-lg text-gray-600">
                  Explore our current job openings and find your next career opportunity.
                </p>
              </div>

              <div className="space-y-6">
                {jobListings.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <BriefcaseIcon className="h-4 w-4 mr-1" />
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{job.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Apply</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Ready to join our team? Here's how you can apply for any of our open positions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a Position</h3>
                  <p className="text-gray-600">Browse our open positions and find one that matches your skills and interests.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Application</h3>
                  <p className="text-gray-600">Send your resume and cover letter to our HR department via email or our online form.</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Process</h3>
                  <p className="text-gray-600">We'll review your application and contact you for an interview if you're a good fit.</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <a
                  href={`mailto:${settings?.contactEmail || 'hr@company.com'}?subject=Job Application`}
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Send Application
                </a>
                <p className="text-sm text-gray-600 mt-4">
                  Or email us directly at: {settings?.contactEmail || 'hr@company.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}