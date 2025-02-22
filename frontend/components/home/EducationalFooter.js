import React from 'react';
import { Book, Scale, Leaf, Shield, FileText, Map, Award, CheckCircle, HelpCircle, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const EducationalFooter = () => {
  const sections = [
    {
      id: 'process',
      title: 'Car Selling Process Guide',
      icon: Book,
      content: [
        {
          title: 'Documentation Required',
          items: [
            'Valid photo identification',
            'Vehicle registration papers',
            'Proof of ownership',
            'Service history (if available)',
            'Any existing damage reports'
          ]
        }
      ]
    },
    {
      id: 'legal',
      title: 'Legal Requirements',
      icon: Scale,
      content: [
        {
          title: 'Transfer of Ownership',
          items: [
            'Signing of transfer papers',
            'Deregistration process',
            'Cancellation of insurance',
            'Payment documentation',
            'Release of liability'
          ]
        }
      ]
    },
    {
      id: 'environmental',
      title: 'Environmental Impact',
      icon: Leaf,
      content: [
        {
          title: 'Recycling Process',
          items: [
            'Hazardous material removal and safe disposal',
            'Parts salvage and reuse program',
            'Metal recycling process',
            'Environmental compliance certification',
            'Waste reduction initiatives'
          ]
        },
        {
          title: 'Environmental Benefits',
          items: [
            'Reduction in landfill waste',
            'Conservation of natural resources',
            'Lower carbon footprint',
            'Support for circular economy',
            'Sustainable automotive practices'
          ]
        }
      ]
    },
    {
      id: 'certifications',
      title: 'Industry Certifications',
      icon: Shield,
      content: [
        {
          title: 'Professional Standards',
          items: [
            'Licensed Auto Recycler Certification',
            'Environmental Management System (EMS)',
            'Occupational Health & Safety Standards',
            'Quality Management System (ISO 9001)',
            'Automotive Recyclers Environmental Code'
          ]
        },
        {
          title: 'Team Qualifications',
          items: [
            'Certified Auto Recycling Specialists',
            'Environmental Compliance Officers',
            'Certified Vehicle Appraisers',
            'Hazardous Materials Handling Certification',
            'Ongoing Professional Development'
          ]
        },
        {
          title: 'Industry Memberships',
          items: [
            'Auto Recyclers Association',
            'Environmental Protection Agency Partnership',
            'Sustainable Business Network',
            'Automotive Industry Association',
            'Local Business Chamber'
          ]
        }
      ]
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      icon: HelpCircle,
      content: [
        {
          title: 'General Questions',
          items: [
            'How long does the entire process take? Usually completed within 24-48 hours',
            'Do you pick up non-running vehicles? Yes, free towing service provided',
            'What areas do you service? Coverage across all major cities',
            'Do you buy accident-damaged cars? Yes, in any condition',
            'Is same-day payment available? Yes, instant bank transfer available'
          ]
        },
        {
          title: 'Documentation Questions',
          items: [
            'What documents do I need? Registration and valid ID required',
            'Can you help with paperwork? Yes, full assistance provided',
            'What if I lost my title? We can help with replacement process',
            'Need plates returned? We handle plate return to authorities',
            'Duplicate paperwork needed? We provide all necessary copies'
          ]
        },
        {
          title: 'Pricing & Payment',
          items: [
            'How is car value determined? Based on condition, market value, parts',
            'What payment methods available? Bank transfer, cash, or cheque',
            'Any hidden fees? No, we offer transparent pricing',
            'Price matching available? Yes, with valid written quotes',
            'Deposits required? No upfront payments needed'
          ]
        }
      ]
    }
  ];

  const navigationLinks = {
    services: {
      title: 'Our Services',
      links: [
        { name: 'Car Removal', href: '/services/car-removal' },
        { name: 'Cash for Cars', href: '/services/cash-for-cars' },
        { name: 'Scrap Car Collection', href: '/services/scrap-car-collection' },
        { name: 'Parts Recycling', href: '/services/parts-recycling' }
      ]
    },
    information: {
      title: 'Information',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Service Areas', href: '/locations' },
        { name: 'How It Works', href: '/process' },
        { name: 'Blog', href: '/blog' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' }
      ]
    }
  };

  const contactInfo = {
    phone: '1800 000 000',
    email: 'info@carwreckers.com',
    address: '123 Wrecker Street, Sydney NSW 2000',
    social: [
      { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
      { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
      { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' }
    ]
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Resources Section */}
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Resources & Information
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {sections.map((section) => (
            <Card key={section.id} className="border dark:bg-gray-800">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={section.id}>
                    <AccordionTrigger className="flex items-center gap-3">
                      <section.icon className="w-5 h-5" />
                      <span className="text-xl font-semibold">{section.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 pt-4">
                        {section.content.map((subsection, idx) => (
                          <div key={idx} className="space-y-3">
                            <h4 className="font-medium text-lg text-gray-700 dark:text-gray-300">
                              {subsection.title}
                            </h4>
                            <ul className="space-y-2">
                              {subsection.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                                  <span className="block w-1 h-1 mt-2 rounded-full bg-blue-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Navigation Links */}
            {Object.values(navigationLinks).map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{contactInfo.phone}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{contactInfo.email}</span>
                </li>
                <li className="text-gray-600 dark:text-gray-400">
                  {contactInfo.address}
                </li>
                <li className="flex items-center gap-4 pt-2">
                  {contactInfo.social.map((platform, idx) => (
                    <a
                      key={idx}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <platform.icon className="w-5 h-5" />
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Car Wreckers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EducationalFooter;