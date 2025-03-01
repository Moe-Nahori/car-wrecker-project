import React from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactInfoForm = ({ quoteData, handleChange, formErrors }) => {
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
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={quoteData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                formErrors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
            />
          </div>
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={quoteData.phone}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              formErrors.phone ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
          />
        </div>
        {formErrors.phone && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phone}</p>
        )}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Preferred Contact Method</h3>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="contactPhone"
              name="preferredContact"
              value="phone"
              checked={quoteData.preferredContact === 'phone'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="contactPhone" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Phone Call
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="contactSMS"
              name="preferredContact"
              value="sms"
              checked={quoteData.preferredContact === 'sms'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="contactSMS" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              SMS
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="contactEmail"
              name="preferredContact"
              value="email"
              checked={quoteData.preferredContact === 'email'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="contactEmail" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          By submitting this form, you agree to our terms and conditions. We'll contact you shortly with your quote.
        </p>
      </div>
    </div>
  );
};

export default ContactInfoForm;