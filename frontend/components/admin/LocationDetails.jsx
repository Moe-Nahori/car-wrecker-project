import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import PartnersList from './PartnersList';

// Australian states for dropdown
const australianStates = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

const LocationDetails = ({ location, onUpdateLocation, onDeleteLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(location);

  // Handle field changes
  const handleFieldChange = (field, value) => {
    let processedValue = value;
    
    // Special handling for numeric fields
    if (field === 'wreckers' || field === 'lat' || field === 'lng') {
      processedValue = parseFloat(value) || 0;
    }
    
    // Special handling for boolean fields
    if (field === 'isHighlighted') {
      processedValue = !!value; // Ensure boolean
    }
    
    const updatedLocation = { 
      ...currentLocation, 
      [field]: processedValue 
    };
    
    setCurrentLocation(updatedLocation);
    onUpdateLocation(updatedLocation);
  };

  // Handle partner updates
  const handleUpdatePartners = (updatedParticipants) => {
    const updatedLocation = {
      ...currentLocation,
      participants: updatedParticipants
    };
    
    setCurrentLocation(updatedLocation);
    onUpdateLocation(updatedLocation);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          Location Details
        </h2>
        <button
          onClick={() => onDeleteLocation(currentLocation.id)}
          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
        >
          <Trash size={16} className="mr-1" />
          Delete Location
        </button>
      </div>

      {/* Location Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID (Short Code)
          </label>
          <input
            type="text"
            value={currentLocation.id}
            onChange={(e) => handleFieldChange('id', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City Name
          </label>
          <input
            type="text"
            value={currentLocation.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            State
          </label>
          <select
            value={currentLocation.state}
            onChange={(e) => handleFieldChange('state', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {australianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Wreckers
          </label>
          <input
            type="number"
            value={currentLocation.wreckers}
            onChange={(e) => handleFieldChange('wreckers', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={currentLocation.lat}
            onChange={(e) => handleFieldChange('lat', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={currentLocation.lng}
            onChange={(e) => handleFieldChange('lng', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isHighlighted"
            checked={currentLocation.isHighlighted}
            onChange={(e) => handleFieldChange('isHighlighted', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isHighlighted" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Highlight on map (major city)
          </label>
        </div>
      </div>

      {/* Partners Section */}
      <div className="mt-8">
        <PartnersList 
          partners={currentLocation.participants}
          onUpdatePartners={handleUpdatePartners}
        />
      </div>
    </div>
  );
};

export default LocationDetails;
