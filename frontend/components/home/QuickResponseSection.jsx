import React from 'react';
import { Clock, MessageSquare, PhoneCall } from 'lucide-react';
import Link from 'next/link';

const QuickResponseSection = () => {
  const contactMethods = [
    {
      icon: Clock,
      title: "24/7 Service",
      description: "We're available around the clock for your convenience"
    },
    {
      icon: MessageSquare,
      title: "Instant Online Quote",
      description: "Get an immediate estimate through our online form"
    },
    {
      icon: PhoneCall,
      title: "Phone Support",
      description: "Speak directly with our friendly team"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Response Guaranteed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get in touch with us now - we'll respond within minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {method.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Contact Us Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickResponseSection;