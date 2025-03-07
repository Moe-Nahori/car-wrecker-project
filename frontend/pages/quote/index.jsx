import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

// Import components
import VehicleInfoForm from '../../components/quote/VehicleInfoForm';
import AdditionalDetailsForm from '../../components/quote/AdditionalDetailsForm';
import ContactInfoForm from '../../components/quote/ContactInfoForm';
import QuoteResult from '../../components/quote/QuoteResult';

// Import data and utilities
import carMakesData from '../../data/carMakesData';
import { calculateQuote } from '../../utils/quoteCalculator';
import { getCompanyName } from '../../utils/config';

const QuotePage = () => {
  const router = useRouter();
  const companyName = getCompanyName();
  
  const [step, setStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    make: '',
    model: '',
    year: '',
    condition: '',
    hasKeys: true,
    hasWheels: true,
    isRegistered: false,
    hasCatalytic: true,
    engineType: 'petrol',
    location: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    additionalInfo: ''
  });

  const [quoteResult, setQuoteResult] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate years for dropdown (from 1960 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1959 }, (_, i) => currentYear - i);

  // Handle URL query parameters when page loads
  useEffect(() => {
    if (router.query) {
      const { make, model, year, condition, location } = router.query;
      
      // Update form with any provided query params
      const updatedData = { ...quoteData };
      if (make) updatedData.make = make;
      if (model) updatedData.model = model;
      if (year) updatedData.year = year;
      if (condition) updatedData.condition = condition;
      if (location) updatedData.location = location;
      
      setQuoteData(updatedData);
    }
  }, [router.query]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear any error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
    
    setQuoteData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = () => {
    const errors = {};
    
    if (step === 1) {
      if (!quoteData.make) errors.make = "Please select a make";
      if (!quoteData.model) errors.model = "Please select a model";
      if (!quoteData.year) errors.year = "Please select a year";
      if (!quoteData.condition) errors.condition = "Please select a condition";
    } else if (step === 2) {
      if (!quoteData.location) errors.location = "Please enter your location";
    } else if (step === 3) {
      if (!quoteData.name) errors.name = "Please enter your name";
      if (!quoteData.email) errors.email = "Please enter a valid email";
      if (!quoteData.phone) errors.phone = "Please enter your phone number";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Show processing state
      setIsSubmitting(true);
      
      // Simulate API call with a delay
      setTimeout(() => {
        const result = calculateQuote(quoteData);
        setQuoteResult(result);
        setIsSubmitting(false);
        setStep(4);
        window.scrollTo(0, 0);
      }, 1500);
    }
  };

  const handleAccept = () => {
    // In a real app, this would submit the acceptance to your backend
    router.push({
      pathname: '/quote/accepted',
      query: { 
        ref: `QT-${Date.now().toString().substr(-6)}`,
        amount: quoteResult.amount,
        make: quoteData.make,
        model: quoteData.model,
        year: quoteData.year
      }
    });
  };

  // Render the appropriate form based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VehicleInfoForm 
            quoteData={quoteData} 
            handleChange={handleChange} 
            formErrors={formErrors}
            availableModels={carMakesData}
            years={years}
          />
        );
      case 2:
        return (
          <AdditionalDetailsForm 
            quoteData={quoteData} 
            handleChange={handleChange} 
            formErrors={formErrors}
          />
        );
      case 3:
        return (
          <ContactInfoForm 
            quoteData={quoteData} 
            handleChange={handleChange} 
            formErrors={formErrors}
          />
        );
      case 4:
        return (
          <QuoteResult 
            quoteResult={quoteResult} 
            quoteData={quoteData} 
            handleAccept={handleAccept}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Get Your Free Quote | {companyName}</title>
        <meta name="description" content={`Get an instant valuation for your unwanted vehicle. Fill out our simple form and receive a competitive quote from ${companyName}.`} />
      </Head>
      
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
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : step === 3 ? 'Get Quote' : 'Continue'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotePage;