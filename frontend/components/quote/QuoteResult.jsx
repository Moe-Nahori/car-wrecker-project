import React from 'react';
import { DollarSign, Calendar, Truck, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

const QuoteResult = ({ quoteResult, quoteData, handleAccept }) => {
  return (
    <div className="space-y-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Quote</h2>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg">
        <DollarSign className="w-16 h-16 mx-auto text-green-600 dark:text-green-400 mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ${quoteResult.amount}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Estimated for your {quoteData.year} {quoteData.make} {quoteData.model}
        </p>
        
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 rounded-lg inline-block">
          <div className="flex items-center text-green-800 dark:text-green-200 font-medium">
            <Clock className="w-5 h-5 mr-2" />
            <span>Accept now for a bonus ${quoteResult.bonusAmount}!</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <Calendar className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-300">
            Pickup available within <span className="font-bold">{quoteResult.estimatedPickupDays} days</span>
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <Truck className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-300">
            Free towing from <span className="font-bold">{quoteData.location}</span>
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <Shield className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-300">
            Price guaranteed for <span className="font-bold">{quoteResult.guaranteedDays} days</span>
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">What happens next?</h4>
        <ol className="text-gray-600 dark:text-gray-300 space-y-2 pl-5 list-decimal">
          <li>Accept your quote to lock in this price</li>
          <li>We'll call you to confirm details and arrange pickup</li>
          <li>Our team will arrive at the agreed time</li>
          <li>You'll receive payment on the spot after paperwork is completed</li>
        </ol>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleAccept}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Accept Quote
        </button>
        
        <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default QuoteResult;