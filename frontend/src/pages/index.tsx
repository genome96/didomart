import React from 'react';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HotDeals from '@/components/home/HotDeals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ContactSection from '@/components/home/ContactSection';
import { Category, Product } from '@/types';
import { useSettings } from '@/contexts/SettingsContext';
import api from '@/lib/api';

interface HomeProps {
  categories: Category[];
  featuredProducts: Product[];
  hotDeals: Product[];
}

export default function Home({ categories, featuredProducts, hotDeals }: HomeProps) {
  const { settings } = useSettings();
  const businessName = settings?.siteName || process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Your Business';
  
  return (
    <>
      <NextSeo
        title={`${businessName} - Quality Tools & Equipment`}
        description="Discover our wide range of quality tools, equipment, and machinery. From power tools to solar systems, we have everything you need for your projects."
        canonical={process.env.NEXT_PUBLIC_CLIENT_URL}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: process.env.NEXT_PUBLIC_CLIENT_URL,
          siteName: businessName,
          title: `${businessName} - Quality Tools & Equipment`,
          description: 'Discover our wide range of quality tools, equipment, and machinery. From power tools to solar systems, we have everything you need for your projects.',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/images/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: `${businessName} - Quality Tools & Equipment`,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      
      <Layout>
        <Hero />
        
        {categories.length > 0 && (
          <FeaturedCategories categories={categories} />
        )}
        
        {hotDeals.length > 0 && (
          <HotDeals products={hotDeals} />
        )}
        
        {featuredProducts.length > 0 && (
          <FeaturedProducts products={featuredProducts} />
        )}
        
        <WhyChooseUs />
        
        <ContactSection />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch categories
    const categoriesResponse = await api.get('/categories?active=true');
    const categories = categoriesResponse.data.data || [];

    // Fetch featured products
    const featuredResponse = await api.get('/products/featured?limit=8');
    const featuredProducts = featuredResponse.data.data || [];

    // Fetch hot deals
    const hotDealsResponse = await api.get('/products/hot-deals?limit=12');
    const hotDeals = hotDealsResponse.data.data || [];

    return {
      props: {
        categories: categories.slice(0, 6), // Show only first 6 categories
        featuredProducts,
        hotDeals,
      },
      revalidate: 60 * 15, // Revalidate every 15 minutes
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    
    return {
      props: {
        categories: [],
        featuredProducts: [],
        hotDeals: [],
      },
      revalidate: 60, // Retry in 1 minute if error
    };
  }
};
