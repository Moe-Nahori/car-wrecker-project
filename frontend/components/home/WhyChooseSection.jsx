import React from 'react';
import { DollarSign, Clock, Truck, Leaf, Shield, Award, Check } from 'lucide-react';
import Link from 'next/link';

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: "Highest Payouts Guaranteed",
      description: "We consistently offer the highest prices for all vehicle types and will beat any legitimate competitor's offer."
    },
    {
      icon: Truck,
      title: "Free Towing Nationwide",
      description: "Complimentary pickup service across all our locations in Australia with no hidden charges."
    },
    {
      icon: Clock,
      title: "Same-Day Service",
      description: "Get your quote, schedule pickup, and receive payment all in the same day - no long waiting times."
    },
    {
      icon: Shield,
      title: "Licensed & Insured Operators",
      description: "Our team is fully vetted, licensed, and insured to provide you with a safe and secure service."
    },
    {
      icon: Leaf,
      title: "Environmentally Certified Recycling",
      description: "We follow strict environmental guidelines to ensure responsible disposal and recycling of all vehicles."
    },
    {
      icon: Award,
      title: "No Hidden Fees or Charges",
      description: "The price we quote is what you get - we handle all paperwork and transfer fees with no surprises."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the difference with Australia's most trusted car wrecking service - over 15 years of excellent service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col space-y-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full inline-flex">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Customer Satisfaction is Our Priority
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join the thousands of satisfied customers who have chosen us for their car selling needs. Our commitment to excellence has made us the most trusted car wrecking service in Australia.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Over 25,000 vehicles processed</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>4.9/5 average customer rating</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Servicing all of Australia</span>
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Fully compliant with all regulations</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg max-w-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">25,000+</div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Vehicles Purchased</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Across Australia</div>
                  <Link 
                    href="/quote" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md w-full"
                  >
                    Get Your Quote Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;