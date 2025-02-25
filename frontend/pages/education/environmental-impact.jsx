import React from 'react';
import { ChevronLeft, Leaf, Droplets, Factory, ThermometerSnowflake, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

const EnvironmentalImpactPage = () => {
  const environmentalBenefits = [
    {
      icon: Factory,
      title: "Reduced Mining & Manufacturing",
      description: "Recycling one ton of steel saves 1,400 pounds of coal, 120 pounds of limestone, and 2,500 pounds of iron ore. Car recycling reduces the need for raw material extraction and processing."
    },
    {
      icon: Leaf,
      title: "Conservation of Natural Resources",
      description: "Approximately 86% of a vehicle's material can be recycled or reused. This includes metals, glass, plastics, rubber, and other materials that would otherwise require new resource extraction."
    },
    {
      icon: Droplets,
      title: "Prevention of Water Pollution",
      description: "Proper handling of automotive fluids like oil, coolant, and brake fluid prevents these hazardous materials from contaminating soil and water sources. One improperly disposed car can pollute up to 20 million liters of water."
    },
    {
      icon: ThermometerSnowflake,
      title: "Reduced Carbon Emissions",
      description: "Recycling metal requires significantly less energy than producing new metal from ore. This results in lower carbon emissions and helps combat climate change. Car recycling saves an estimated 85 million barrels of oil annually that would be used in new vehicle production."
    },
    {
      icon: BadgeCheck,
      title: "Compliance with Environmental Standards",
      description: "Our recycling processes adhere to strict environmental regulations, ensuring that all hazardous materials are properly contained and processed according to industry best practices."
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
          Environmental Impact of Car Recycling
        </h1>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Each year, millions of vehicles reach the end of their useful lives. Rather than allowing these vehicles to occupy landfills or leak hazardous materials into the environment, our car recycling program transforms them into valuable resources while minimizing environmental harm.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Environmental Benefits
          </h2>
          
          <div className="space-y-8">
            {environmentalBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            The Environmental Cost of Improper Disposal
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When vehicles are improperly disposed of or abandoned, they can cause serious environmental damage:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
            <li>Engine oil can contaminate soil and water sources</li>
            <li>Battery acid can leach heavy metals into groundwater</li>
            <li>Air conditioning refrigerants can contribute to ozone depletion</li>
            <li>Fuel and other fluids can evaporate, contributing to air pollution</li>
            <li>Tires in landfills can trap methane gas and become breeding grounds for mosquitoes</li>
          </ul>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              By choosing our environmentally responsible car wrecking service, you're making a significant contribution to environmental conservation and sustainable resource management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpactPage;