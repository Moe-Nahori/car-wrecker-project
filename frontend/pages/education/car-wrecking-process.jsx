import React from 'react';
import { ChevronLeft, Wrench, CarFront, Recycle, TruckIcon, ClipboardCheck } from 'lucide-react';
import Link from 'next/link';

const CarWreckingProcessPage = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      title: "Vehicle Assessment",
      description: "Our experts evaluate the condition of your vehicle, checking for salvageable parts and materials. This assessment helps determine the optimal dismantling approach."
    },
    {
      icon: Wrench,
      title: "Dismantling & Parts Recovery",
      description: "Skilled technicians carefully dismantle the vehicle, salvaging valuable components like engines, transmissions, electronics, and body parts that can be refurbished and resold."
    },
    {
      icon: Recycle,
      title: "Material Separation",
      description: "Different materials (metals, plastics, glass, etc.) are separated and sorted. This critical step ensures that each material type can be processed appropriately in the recycling chain."
    },
    {
      icon: TruckIcon,
      title: "Processing & Recycling",
      description: "Materials are sent to specialized recycling facilities. Metals are melted down for reuse, plastics are processed for repurposing, and other materials are handled according to environmental best practices."
    },
    {
      icon: CarFront,
      title: "Environmental Compliance",
      description: "Throughout the process, we adhere to strict environmental regulations, properly managing hazardous materials like batteries, oils, and refrigerants to prevent environmental contamination."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Our Car Wrecking Process
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          At our facility, we've developed an environmentally responsible and efficient process for dismantling end-of-life vehicles. Our goal is to maximize resource recovery while minimizing environmental impact.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Our 5-Step Process
          </h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Benefits of Our Process
          </h2>
          
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Reduces landfill waste by up to 80% per vehicle</li>
            <li>Recovers valuable metals and materials for reuse</li>
            <li>Prevents hazardous materials from contaminating soil and water</li>
            <li>Decreases the need for new raw material extraction</li>
            <li>Conserves energy compared to producing new parts from raw materials</li>
            <li>Complies with all environmental regulations and industry best practices</li>
          </ul>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              By choosing our service, you're contributing to a more sustainable automotive lifecycle. Every vehicle we process is handled with the utmost care for environmental responsibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarWreckingProcessPage;