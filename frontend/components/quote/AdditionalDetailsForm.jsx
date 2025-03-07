import React from 'react';
import { MapPin } from 'lucide-react';

const AdditionalDetailsForm = ({ quoteData, handleChange, formErrors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Additional Details</h2>
      
      <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Vehicle Features</h3>
        
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
              I have the keys for the vehicle
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
              The vehicle has all wheels and tires
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
              The vehicle is currently registered
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasCatalytic"
              name="hasCatalytic"
              checked={quoteData.hasCatalytic}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasCatalytic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              The vehicle has a catalytic converter
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-750 p-5 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Engine Type</h3>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="enginePetrol"
              name="engineType"
              value="petrol"
              checked={quoteData.engineType === 'petrol'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="enginePetrol" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Petrol
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="engineDiesel"
              name="engineType"
              value="diesel"
              checked={quoteData.engineType === 'diesel'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="engineDiesel" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Diesel
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="engineHybrid"
              name="engineType"
              value="hybrid"
              checked={quoteData.engineType === 'hybrid'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="engineHybrid" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Hybrid
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="engineElectric"
              name="engineType"
              value="electric"
              checked={quoteData.engineType === 'electric'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="engineElectric" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Electric
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Vehicle Location (Suburb/Postcode) *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g., Sydney 2000"
            value={quoteData.location}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              formErrors.location ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
          />
        </div>
        {formErrors.location && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.location}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Additional Information (Optional)
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows="3"
          placeholder="Any other details about your vehicle that might affect its value..."
          value={quoteData.additionalInfo}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>
    </div>
  );
};

export default AdditionalDetailsForm;