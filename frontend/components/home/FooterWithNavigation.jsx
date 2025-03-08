import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { getCompanyName, getCompanyMeta, getContactInfo, getSocialLinks } from '../../utils/config';

const FooterWithNavigation = () => {
  const companyName = getCompanyName();
  const companyMeta = getCompanyMeta();
  const contactInfo = getContactInfo();
  const socialLinks = getSocialLinks();
  
  const mainNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Get a Quote', href: '/quote' },
    { name: 'Locations', href: '/locations' },
    { name: 'Resources', href: '/education' },
    { name: 'Contact', href: '/contact' },
  ];

  const resourcesLinks = [
    { name: 'How It Works', href: '/education/car-wrecking-process' },
    { name: 'About Us', href: '/about' },
    { name: 'FAQs', href: '/education/faqs' },
    { name: 'Blog', href: '/blog' },
  ];

  // Updated with correct location IDs from wreckerLocations.json
  const locationLinks = [
    { name: 'Sydney', href: '/locations/SYD' },
    { name: 'Melbourne', href: '/locations/MEL' },
    { name: 'Brisbane', href: '/locations/BRI' },
    { name: 'Perth', href: '/locations/PER' },
    { name: 'Adelaide', href: '/locations/ADL' },
    { name: 'Gold Coast', href: '/locations/GCT' },
    { name: 'All Locations', href: '/locations' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Navigation */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            {mainNavLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href}
                className="text-gray-300 hover:text-white font-medium transition duration-150 ease-in-out"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">{companyName}</h3>
              <p className="text-gray-400 mb-4">
                Australia's leading car wrecking and recycling service. Est. {companyMeta.established}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-white">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-2 text-blue-400" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  <span>National Service - 500+ Locations</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                {resourcesLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Locations</h3>
              <ul className="space-y-2">
                {locationLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="flex items-center text-gray-400 hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Get a Free Quote</h3>
              <p className="text-gray-400 mb-4">
                Ready to sell your car? Get an instant valuation now!
              </p>
              <Link 
                href="/quote"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Get Free Quote
              </Link>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href={socialLinks.facebook || "#"} className="text-gray-400 hover:text-white">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.instagram || "#"} className="text-gray-400 hover:text-white">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.linkedin || "#"} className="text-gray-400 hover:text-white">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved. ABN: {companyMeta.abn || '12 345 678 901'}
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-white">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 text-sm hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithNavigation;