import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Function to determine if a nav link is active
  const isActive = (path: string) => {
    if (path === '/' && router.pathname !== '/') {
      return false;
    }
    return router.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Fitness & Health Hub</title>
      </Head>
      
      {/* Plausible Analytics Script */}
      <Script 
        defer 
        data-domain="tempsite.com" 
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      
      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                F
              </div>
              <span>Fitness & Health Hub</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link href="/" className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Home
              </Link>
              <Link href="/blog" className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${isActive('/blog') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Blog
              </Link>
              <Link href="/tools/tdee" className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${isActive('/tools/tdee') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Maintenance Calorie Calculator
              </Link>
              <Link href="/tools/bodyfat" className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${isActive('/tools/bodyfat') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Body Fat Estimator
              </Link>
              <Link href="/tools/workout-split" className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${isActive('/tools/workout-split') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                Workout Split
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/" 
                  className={`px-4 py-2 rounded-md font-medium ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/blog" 
                  className={`px-4 py-2 rounded-md font-medium ${isActive('/blog') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                  onClick={toggleMobileMenu}
                >
                  Blog
                </Link>
                <Link 
                  href="/tools/tdee" 
                  className={`px-4 py-2 rounded-md font-medium ${isActive('/tools/tdee') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                  onClick={toggleMobileMenu}
                >
                  Maintenance Calorie Calculator
                </Link>
                <Link 
                  href="/tools/bodyfat" 
                  className={`px-4 py-2 rounded-md font-medium ${isActive('/tools/bodyfat') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                  onClick={toggleMobileMenu}
                >
                  Body Fat Estimator
                </Link>
                <Link 
                  href="/tools/workout-split" 
                  className={`px-4 py-2 rounded-md font-medium ${isActive('/tools/workout-split') ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                  onClick={toggleMobileMenu}
                >
                  Workout Split
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] bg-repeat"></div>
        </div>
        
        <div className="absolute -right-20 -bottom-40 w-80 h-80 bg-blue-500 rounded-full opacity-10"></div>
        <div className="absolute -left-20 -top-40 w-80 h-80 bg-yellow-400 rounded-full opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:justify-items-center">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  F
                </div>
                <h3 className="text-xl font-bold text-white">Fitness & Health Hub</h3>
              </div>
              <p className="text-blue-100 mb-6">Your ultimate resource for fitness advice, health tools, and workout guidance.</p>

            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-white border-b border-blue-700 pb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/tools/tdee" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Maintenance Calorie Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/bodyfat" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Body Fat Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/workout-split" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Workout Split Generator
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-white border-b border-blue-700 pb-2">Tools</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/tools/tdee" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Maintenance Calorie Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/bodyfat" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Estimate Body Fat
                  </Link>
                </li>
                <li>
                  <Link href="/tools/workout-split" className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Generate Workout Split
                  </Link>
                </li>
              </ul>
            </div>
            

          </div>
          
          <div className="mt-12 pt-8 border-t border-blue-700 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} Fitness & Health Hub. All rights reserved.</p>
            <p className="mt-2 text-sm text-blue-300">Disclaimer: The information provided on this website is for general informational purposes only and should not be considered as professional advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
