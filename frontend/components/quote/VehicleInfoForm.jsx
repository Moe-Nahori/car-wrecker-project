import React from 'react';
import { Info } from 'lucide-react';

const VehicleInfoForm = ({ quoteData, handleChange, formErrors, availableModels, years }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicle Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Car Make *
          </label>
          <select
            id="make"
            name="make"
            value={quoteData.make}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.make ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
          >
            <option value="">Select Make</option>
            {Object.keys(availableModels).map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
          {formErrors.make && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.make}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Car Model *
          </label>
          <select
            id="model"
            name="model"
            value={quoteData.model}
            onChange={handleChange}
            disabled={!quoteData.make}
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.model ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              !quoteData.make ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : ''
            }`}
          >
            <option value="">Select Model</option>
            {quoteData.make && availableModels[quoteData.make]?.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          {formErrors.model && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.model}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Year of Manufacture *
          </label>
          <select
            id="year"
            name="year"
            value={quoteData.year}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.year ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {formErrors.year && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.year}</p>
          )}
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
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.condition ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
          >
            <option value="">Select Condition</option>
            <option value="excellent">Excellent - Running perfectly</option>
            <option value="good">Good - Minor issues but runs</option>
            <option value="fair">Fair - Has significant issues</option>
            <option value="poor">Poor - Not running/Damaged</option>
            <option value="scrap">Scrap - Severely damaged</option>
          </select>
          {formErrors.condition && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.condition}</p>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start space-x-3">
        <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-blue-800 dark:text-blue-300">Why these details matter</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Providing accurate vehicle information helps us give you the most precise valuation. 
            The condition and age of your vehicle significantly impact its recycling value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoForm;