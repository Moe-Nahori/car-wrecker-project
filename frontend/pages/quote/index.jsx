import React, { useState } from 'react';
import { ChevronLeft, DollarSign, Calendar, Truck, MapPin } from 'lucide-react';
import Link from 'next/link';

const QuotePage = () => {
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    make: '',
    model: '',
    year: '',
    condition: '',
    hasKeys: true,
    hasWheels: true,
    isRegistered: false,
    location: '',
    name: '',
    email: '',
    phone: ''
  });

  const [quoteResult, setQuoteResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuoteData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // In a real app, you would send the data to your backend here
      // For demo purposes, let's generate a random quote between $300 and $3000
      const randomQuote = Math.floor(Math.random() * 2700) + 300;
      setQuoteResult({
        amount: randomQuote,
        estimatedPickupDays: Math.floor(Math.random() * 2) + 1
      });
      setStep(4);
    }
  };

  const handleAccept = () => {
    alert('Thank you for accepting your quote! Our team will contact you shortly to arrange the pickup.');
    // In a real app, you would submit the acceptance to your backend
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Car Make *
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  placeholder="e.g., Toyota"
                  value={quoteData.make}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Car Model *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  placeholder="e.g., Corolla"
                  value={quoteData.model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year of Manufacture *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="e.g., 2010"
                  min="1950"
                  max={new Date().getFullYear()}
                  value={quoteData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vehicle Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={quoteData.condition}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Condition</option>
                  <option value="excellent">Excellent - Running perfectly</option>
                  <option value="good">Good - Minor issues but runs</option>
                  <option value="fair">Fair - Has significant issues</option>
                  <option value="poor">Poor - Not running/Damaged</option>
                  <option value="scrap">Scrap - Severely damaged</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Additional Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasKeys"
                  name="hasKeys"
                  checked={quoteData.hasKeys}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasKeys" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Do you have keys for the vehicle?
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasWheels"
                  name="hasWheels"
                  checked={quoteData.hasWheels}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasWheels" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Does the vehicle have all wheels?
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isRegistered"
                  name="isRegistered"
                  checked={quoteData.isRegistered}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isRegistered" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Is the vehicle currently registered?
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Location (Suburb/Postcode) *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., Sydney 2000"
                value={quoteData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={quoteData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={quoteData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={quoteData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                By submitting this form, you agree to our terms and conditions. We'll contact you shortly with your quote.
              </p>
            </div>
          </div>
        );
        
      case 4:
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Get Your Free Quote
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out the form below to receive an instant valuation for your vehicle
              </p>
            </div>
            
            {step < 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`flex-1 h-2 ${
                        s <= step
                          ? 'bg-blue-600 dark:bg-blue-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      } ${s > 1 && 'ml-2'}`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Vehicle</span>
                  <span>Details</span>
                  <span>Contact</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {renderStep()}
              
              {step < 4 && (
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {step === 3 ? 'Get Quote' : 'Continue'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;