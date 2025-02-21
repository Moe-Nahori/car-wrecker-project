import React from 'react';
import { ClipboardList, Truck, BankNote } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      Icon: ClipboardList,  // Changed from lowercase 'icon' to uppercase 'Icon'
      title: "1. Get a Quote",
      description: "Enter your car details and receive an instant valuation based on current market rates.",
      timing: "Takes 2 minutes"
    },
    {
      Icon: Truck,  // Changed here too
      title: "2. Free Pickup",
      description: "We'll send a professional team to inspect and collect your car at a time that suits you.",
      timing: "Same day available"
    },
    {
      Icon: BankNote,  // And here
      title: "3. Get Paid",
      description: "Receive immediate payment via bank transfer or cash - your choice!",
      timing: "Instant payment"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get cash for your car in three simple steps. Fast, easy, and hassle-free process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const StepIcon = step.Icon;  // Create component reference
            return (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                    <StepIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {step.timing}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Average response time: under 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;