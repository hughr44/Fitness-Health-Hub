import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/BlogCard';
import { getRecentPosts, PostMetadata } from '@/lib/posts';

type HomeProps = {
  recentPosts: PostMetadata[];
};

export default function Home({ recentPosts }: HomeProps) {
  return (
    <Layout>
      <SEO 
        title="Home" 
        description="Your ultimate resource for fitness advice, health tools, and workout guidance. Calculate your maintenance calories, estimate body fat, and generate personalized workout splits."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] bg-repeat"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Transform Your <span className="text-yellow-300">Fitness Journey</span> Today</h1>
              <p className="text-xl mb-8 text-blue-100">Access expert tools, personalized guidance, and evidence-based advice to reach your health and fitness goals.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/tools/tdee" className="btn bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-medium px-6 py-3 rounded-lg transform hover:scale-105 transition duration-300 shadow-lg">
                  Calculate Your Maintenance Calories
                </Link>
                <Link href="/blog" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-medium px-6 py-3 rounded-lg transform hover:scale-105 transition duration-300">
                  Explore Articles
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative h-96 animate-slideInRight">
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -left-10 -top-10 w-72 h-72 bg-blue-300 rounded-full opacity-20"></div>
              <div className="relative flex items-center justify-center h-full w-full z-20">
                <div 
                  className="rounded-lg overflow-hidden shadow-lg border-2 border-white/20"
                  style={{ 
                    width: '360px',
                    height: '360px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    src="/images/fhh-logo.png"
                    alt="Fitness & Health Hub Logo"
                    width={300}
                    height={300}
                    style={{ 
                      maxWidth: '300px',
                      maxHeight: '300px',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">FITNESS TOOLS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Science-Backed Calculators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our precision tools to optimize your fitness journey and achieve your goals faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TDEE Calculator Card */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Maintenance Calorie Calculator</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Calculate your daily calorie needs and find the perfect calorie intake for your goals.
                </p>
                <div className="text-center">
                  <Link href="/tools/tdee" className="btn bg-blue-600 text-white hover:bg-blue-700 font-medium px-6 py-3 rounded-lg inline-block shadow-md hover:shadow-lg transition-all duration-300">
                    Calculate Calories
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Body Fat Estimator Card */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Body Fat Estimator</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Get an estimate of your body fat percentage and understand what it means for your health.
                </p>
                <div className="text-center">
                  <Link href="/tools/bodyfat" className="btn bg-green-600 text-white hover:bg-green-700 font-medium px-6 py-3 rounded-lg inline-block shadow-md hover:shadow-lg transition-all duration-300">
                    Estimate Body Fat
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Workout Split Generator Card */}
            <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Workout Split Generator</h3>
                <p className="text-gray-600 mb-6 text-center">
                  Create a personalized workout schedule based on your experience, goals, and available time.
                </p>
                <div className="text-center">
                  <Link href="/tools/workout-split" className="btn bg-purple-600 text-white hover:bg-purple-700 font-medium px-6 py-3 rounded-lg inline-block shadow-md hover:shadow-lg transition-all duration-300">
                    Generate Workout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">LATEST ARTICLES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Evidence-Based Fitness Advice</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with our latest research-backed articles to help you make the best decisions for your fitness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                slug={post.slug}
                date={post.date}
                coverImage={post.coverImage}
                author={post.author}
                category={post.category || 'fitness'}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog" className="btn bg-blue-600 text-white hover:bg-blue-700 font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
      

      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-purple-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] bg-repeat"></div>
        </div>
        
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-300 rounded-full opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our tools and resources are designed to help you achieve your fitness goals, whether you&apos;re just starting out or looking to take your training to the next level.
            </p>
            <Link href="/tools/tdee" className="btn bg-yellow-500 text-gray-900 hover:bg-yellow-400 font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = getRecentPosts(3);
  
  return {
    props: {
      recentPosts,
    },
  };
};
