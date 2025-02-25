import React from 'react';
import { BookOpen, Recycle, DollarSign } from 'lucide-react';
import Link from 'next/link';

const EducationalFooter = () => {
  const educationalContent = [
    {
      icon: BookOpen,
      title: "Car Wrecking Process",
      description: "Learn about our environmentally friendly car dismantling and recycling process.",
      link: "/education/car-wrecking-process"
    },
    {
      icon: Recycle,
      title: "Environmental Impact",
      description: "Discover how car recycling helps reduce environmental footprint and conserve resources.",
      link: "/education/environmental-impact"
    },
    {
      icon: DollarSign,
      title: "Value Assessment",
      description: "Understand how we determine the value of end-of-life vehicles.",
      link: "/education/value-assessment"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Learn More About Car Wrecking
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Understanding the process helps you make informed decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationalContent.map((content, index) => {
            const Icon = content.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {content.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {content.description}
                  </p>
                  <Link href={content.link} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationalFooter;