import React from 'react';
import { ChevronLeft, DollarSign, BarChart, Scale, AlertTriangle, Car, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const ValueAssessmentPage = () => {
  const valuationFactors = [
    {
      icon: Car,
      title: "Vehicle Make, Model & Year",
      description: "Newer vehicles and popular makes/models typically have higher values due to increased demand for their parts. Certain brands retain higher parts value even in older models."
    },
    {
      icon: Scale,
      title: "Vehicle Condition",
      description: "The overall condition affects value significantly. Vehicles with working engines, minimal rust, and salvageable components are worth more than severely damaged or deteriorated vehicles."
    },
    {
      icon: BarChart,
      title: "Parts Demand",
      description: "We assess current market demand for specific parts from your vehicle. High-demand components like engines, transmissions, and electronic modules increase overall valuation."
    },
    {
      icon: DollarSign,
      title: "Material Value",
      description: "The current market rates for recyclable materials (steel, aluminum, copper, etc.) factor into our valuation. These rates fluctuate based on global commodity markets."
    },
    {
      icon: AlertTriangle,
      title: "Vehicle Completeness",
      description: "Vehicles with all major components intact are valued higher than those missing key parts. A complete car provides more recycling and parts recovery opportunities."
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
          Understanding Our Vehicle Value Assessment
        </h1>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          We pride ourselves on offering fair, transparent, and competitive prices for end-of-life vehicles. Our valuation process considers multiple factors to ensure you receive the best possible value for your car.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Key Valuation Factors
          </h2>
          
          <div className="space-y-8">
            {valuationFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {factor.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {factor.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Valuation Process
          </h2>
          
          <ol className="list-decimal pl-5 space-y-4 text-gray-600 dark:text-gray-300 mb-6">
            <li className="pl-2">
              <span className="font-medium text-gray-900 dark:text-white">Initial Assessment</span>: We gather basic information about your vehicle (make, model, year, condition) to provide a preliminary quote.
            </li>
            <li className="pl-2">
              <span className="font-medium text-gray-900 dark:text-white">Physical Inspection</span>: Our technicians inspect the vehicle in person to verify its condition and identify valuable components.
            </li>
            <li className="pl-2">
              <span className="font-medium text-gray-900 dark:text-white">Market Analysis</span>: We evaluate current market demand for parts and materials specific to your vehicle.
            </li>
            <li className="pl-2">
              <span className="font-medium text-gray-900 dark:text-white">Final Offer</span>: Based on our assessment, we provide a competitive cash offer which we stand by.
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-1" />
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium">Our Best Price Guarantee</span>: We're confident in our valuation process and stand by our offers. If you receive a higher legitimate offer from another licensed car wrecker, we'll match or beat it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueAssessmentPage;