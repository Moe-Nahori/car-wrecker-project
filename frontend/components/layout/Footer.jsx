import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { 
  getCompanyName, 
  getContactInfo, 
  getSocialLinks,
  getCompanyMeta
} from '../../utils/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Get company data from config
  const companyName = getCompanyName();
  const contactInfo = getContactInfo();
  const socialLinks = getSocialLinks();
  const companyMeta = getCompanyMeta();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">{companyName}</h2>
            <p className="text-gray-400 mb-4">{companyMeta.description}</p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-white">
                  Find Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Our Services</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white">
                  Car Removal
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white">
                  Cash for Cars
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white">
                  Junk Car Removal
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white">
                  Scrap Car Recycling
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Contact Info</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{contactInfo.phone}</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">{contactInfo.email}</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  {contactInfo.address.street}, {contactInfo.address.suburb}, {contactInfo.address.state} {contactInfo.address.postcode}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-400 hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;