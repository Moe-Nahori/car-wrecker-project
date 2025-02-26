import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 prose prose-blue dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQPreviewSection = () => {
  const faqs = [
    {
      question: "How much is my car worth?",
      answer: "The value of your car depends on several factors including make, model, year, condition, mileage, and market demand. Our valuation tool provides an instant estimate based on current market rates. For the most accurate valuation, complete our online form for a free, no-obligation quote."
    },
    {
      question: "Do you buy cars that don't run?",
      answer: "Yes, we purchase vehicles in any condition, including those that are not running, damaged, or written off. Our network of wreckers specializes in all types of vehicles, regardless of their state. The condition will be factored into the valuation, but we guarantee a fair price."
    },
    {
      question: "How soon can you pick up my car?",
      answer: "In most major cities and surrounding areas, we offer same-day or next-day pickup. When you accept our offer, you can schedule the pickup at a time that's convenient for you. Our team will confirm the appointment and arrive promptly as scheduled."
    },
    {
      question: "What paperwork do I need to sell my car?",
      answer: "You'll need to provide proof of ownership (registration papers or title), a valid photo ID, and in some states, a roadworthy certificate or other documentation. Don't worry though - our team will guide you through the process and help with all necessary paperwork during pickup."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get answers to common questions about our car buying service
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/education/faqs" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View all FAQs
              <ChevronDown className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPreviewSection;