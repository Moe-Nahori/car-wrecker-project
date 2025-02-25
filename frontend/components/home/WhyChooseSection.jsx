import React from 'react';
import { DollarSign, Clock, Truck, Leaf, Shield, Award } from 'lucide-react';
import Link from 'next/link';

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: "Best Market Rates",
      description: "We consistently offer the highest prices for all vehicle types"
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "Get your quote and cash payment on the same day"
    },
    {
      icon: Truck,
      title: "Free Towing",
      description: "Complimentary pickup service across all locations"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Responsible recycling and disposal of all vehicles"
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully compliant with all industry regulations"
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Professional and experienced car removal specialists"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience the difference with Australia's most trusted car wrecking service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/quote" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Get Your Quote Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;