import * as React from 'react';
import * as Icons from 'lucide-react';
import { useState } from 'react';

const StepCard = ({ IconComponent, title, description, timing, expandedContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
          <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {isExpanded && (
          <div className="text-gray-600 dark:text-gray-300 mt-4">
            {expandedContent}
          </div>
        )}
        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {timing}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
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
          <StepCard 
            IconComponent={Icons.ClipboardCheck}
            title="1. Get a Quote"
            description="Enter your car details and receive an instant valuation based on current market rates."
            timing="Takes 2 minutes"
            expandedContent="Our advanced valuation system considers multiple factors including make, model, year, condition, and current market trends to provide you with the most competitive quote. We guarantee to beat any legitimate quote from other car buyers."
          />
          
          <StepCard 
            IconComponent={Icons.Truck}
            title="2. Free Pickup"
            description="We'll send a professional team to inspect and collect your car at a time that suits you."
            timing="Same day available"
            expandedContent="Our experienced team will arrive at your specified location, perform a quick inspection to confirm the vehicle's condition, and handle all the paperwork. We offer flexible scheduling including weekends and after-hours pickup to accommodate your schedule."
          />
          
          <StepCard 
            IconComponent={Icons.Banknote}
            title="3. Get Paid"
            description="Receive immediate payment via bank transfer or cash - your choice!"
            timing="Instant payment"
            expandedContent="Choose your preferred payment method - instant bank transfer or cash in hand. We handle all the paperwork for ownership transfer and provide you with all necessary documentation. Our process is fully compliant with local regulations."
          />
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