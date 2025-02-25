import React from 'react';
import { MapPin, Car, Truck } from 'lucide-react';
import Link from 'next/link';

const NetworkSection = () => {
  const networkStats = [
    {
      icon: MapPin,
      title: "500+ Locations",
      description: "Across all major cities and regional areas"
    },
    {
      icon: Car,
      title: "All Makes & Models",
      description: "From vintage to modern, we accept all vehicles"
    },
    {
      icon: Truck,
      title: "Free Towing",
      description: "Available in all service areas"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Australia's Largest Car Wrecker Network
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            With over 500 locations nationwide, we're never far away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {networkStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/locations" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Find Your Nearest Location
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;