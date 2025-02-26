import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import { getCompanyName, getContactInfo, getCompanyMeta } from '../../utils/config';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get company data from config
  const companyName = getCompanyName();
  const contactInfo = getContactInfo();
  const companyMeta = getCompanyMeta();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm">{companyMeta.slogan}</p>
          <a href={`tel:${contactInfo.phone}`} className="flex items-center text-sm">
            <Phone className="w-4 h-4 mr-2" />
            {contactInfo.phone}
          </a>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {companyName}
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Home
            </Link>
            <Link href="/quote" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Get a Quote
            </Link>
            <Link href="/locations" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Locations
            </Link>
            <Link href="/education" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Resources
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Contact
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300">
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {/* CTA button */}
          <div className="hidden md:block">
            <Link href="/quote" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/quote" 
              className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
            <Link 
              href="/locations" 
              className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Locations
            </Link>
            <Link 
              href="/education" 
              className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="/contact" 
              className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link 
                href="/quote" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;