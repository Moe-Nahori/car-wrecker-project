import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { getCompanyName } from '../../utils/config';

const FAQsPage = () => {
  const companyName = getCompanyName();
  
  // State to track which FAQ is open
  const [openFaqId, setOpenFaqId] = useState(null);
  
  // Toggle FAQ open/closed state
  const toggleFaq = (id) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };
  
  // FAQ categories with their questions
  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          id: "general-1",
          question: "How does the car wrecking process work?",
          answer: "Our car wrecking process begins with a free valuation of your vehicle. Once agreed, we arrange a convenient pickup time, collect your vehicle, complete the paperwork, and provide same-day payment. Your vehicle is then taken to our facility where it's dismantled, with reusable parts salvaged and remaining materials recycled responsibly."
        },
        {
          id: "general-2",
          question: "Do you buy all types of vehicles?",
          answer: "Yes, we buy all types of vehicles regardless of their condition, age, or make. This includes cars, trucks, vans, SUVs, 4x4s, and commercial vehicles. Whether your vehicle is running, damaged, old, accidental, or simply unwanted, we're interested in buying it."
        },
        {
          id: "general-3",
          question: "How quickly can you pick up my car?",
          answer: `At ${companyName}, we offer same-day pickup in most metro areas. For regional locations, we typically arrange pickup within 24-48 hours. We'll work with your schedule to find a convenient time for collection.`
        }
      ]
    },
    {
      title: "Payment & Pricing",
      faqs: [
        {
          id: "payment-1",
          question: "How is the price of my car determined?",
          answer: "The value of your car is determined by several factors including its make, model, year, condition, mileage, presence of valuable parts, current scrap metal prices, and local market demand. Our valuation system uses real-time data to ensure you get a competitive offer."
        },
        {
          id: "payment-2",
          question: "When and how will I get paid?",
          answer: "We provide payment at the time of vehicle collection, after completing all necessary paperwork. You can choose to be paid via bank transfer (processed immediately), cash, or check according to your preference."
        },
        {
          id: "payment-3",
          question: "Do you charge for vehicle pickup?",
          answer: "No, our vehicle pickup service is completely free. There are no hidden fees or charges regardless of your location within our service area."
        }
      ]
    },
    {
      title: "Documentation & Legal",
      faqs: [
        {
          id: "docs-1",
          question: "What documents do I need to sell my car?",
          answer: "To sell your car, you'll need to provide proof of ownership (typically the vehicle title/registration certificate), a valid photo ID (driver's license or passport), and proof of address. We'll handle the transfer paperwork and provide you with a receipt of sale."
        },
        {
          id: "docs-2",
          question: "What happens to my registration after selling?",
          answer: "After purchasing your vehicle, we'll handle the submission of the transfer papers to the relevant transport authority in your state. However, we recommend that you also notify your state's transport department about the sale as an additional precaution."
        },
        {
          id: "docs-3",
          question: "Can I sell a car that's not registered?",
          answer: "Yes, we buy unregistered vehicles. However, you'll still need to prove ownership with documentation such as a title, previous registration papers, or a statutory declaration in some cases. Our team can advise on the specific requirements in your situation."
        }
      ]
    },
    {
      title: "Environmental Concerns",
      faqs: [
        {
          id: "env-1",
          question: "How is car wrecking environmentally friendly?",
          answer: "Car wrecking is environmentally friendly because it ensures that end-of-life vehicles are processed responsibly. We recycle up to 85% of each vehicle, properly dispose of hazardous materials like oils and batteries, reduce the need for new raw materials, and prevent abandoned vehicles from leaking toxic substances into soil and waterways."
        },
        {
          id: "env-2",
          question: "What happens to hazardous materials in my car?",
          answer: "Hazardous materials such as oils, coolants, brake fluid, batteries, and air conditioning gases are carefully removed and contained during the dismantling process. These materials are then sent to specialized facilities for proper treatment or recycling in compliance with environmental regulations."
        },
        {
          id: "env-3",
          question: "How much of my car will actually be recycled?",
          answer: "Approximately 75-85% of your car by weight will be recycled. Metals like steel, aluminum, and copper are fully recyclable, while some plastics, glass, and rubber components can also be recycled or repurposed. Only a small percentage of materials that cannot be recycled with current technology go to landfill."
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Frequently Asked Questions | {companyName}</title>
        <meta name="description" content="Find answers to common questions about car wrecking, recycling, payments, documentation, and environmental impact." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Education Center
          </Link>
          
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our car wrecking and recycling services
            </p>
          </div>
          
          {/* FAQ Categories */}
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <div 
                    key={faq.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="flex justify-between items-center w-full p-5 text-left transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      {openFaqId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                    
                    {openFaqId === faq.id && (
                      <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                        <p className="text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* CTA Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center mt-12">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5">
              Our team is ready to assist you with any additional questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </Link>
              <Link 
                href="/quote"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQsPage;