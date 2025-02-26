import * as React from 'react';
import { ClipboardCheck, Truck, Banknote, Calendar, ArrowRight } from 'lucide-react';

const StepCard = ({ icon: Icon, number, title, description, isLast }) => {
  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative z-10 h-full border border-gray-100 dark:border-gray-700">
        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
          {number}
        </div>
        <div className="text-center space-y-4 pt-2">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>

      {/* Arrow to next step - hidden on the last item and on mobile */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
          <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-1 shadow-md">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Connector line - hidden on the last item and on mobile */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 left-full h-[2px] w-8 bg-blue-200 dark:bg-blue-700 transform -translate-y-1/2 z-0"></div>
      )}
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      icon: ClipboardCheck,
      number: 1,
      title: "Enter Vehicle Details",
      description: "Fill in our simple online form with your car's make, model, year, and condition."
    },
    {
      icon: Banknote,
      number: 2,
      title: "Receive Instant Valuation",
      description: "Get an immediate competitive offer based on current market rates and vehicle condition."
    },
    {
      icon: Calendar,
      number: 3,
      title: "Accept Offer & Schedule Pickup",
      description: "Happy with the price? Accept online and choose a convenient pickup time that works for you."
    },
    {
      icon: Truck,
      number: 4,
      title: "Get Paid on the Spot",
      description: "Our team will inspect your vehicle, handle all paperwork, and pay you immediately."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selling your car has never been easier. Four simple steps to turn your unwanted vehicle into cash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              icon={step.icon}
              number={step.number}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Average response time: under 5 minutes</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/quote'}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-md transition duration-150 ease-in-out"
          >
            Start Your Free Valuation Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;