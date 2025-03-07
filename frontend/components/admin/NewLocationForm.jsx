import React, { useState } from 'react';

// Australian states for dropdown
const australianStates = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];

const NewLocationForm = ({ onSave, onCancel }) => {
  const [newLocation, setNewLocation] = useState({
    id: '',
    city: '',
    state: 'NSW',
    wreckers: 0,
    isHighlighted: false,
    lat: 0,
    lng: 0,
    participants: []
  });
  const [validationError, setValidationError] = useState('');

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
    
    setNewLocation({
      ...newLocation,
      [field]: processedValue
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate required fields
    if (!newLocation.id || !newLocation.city || !newLocation.state) {
      setValidationError('ID, City, and State are required fields');
      return;
    }
    
    // ID format validation (simple alphanumeric check)
    if (!/^[A-Za-z0-9]{2,5}$/.test(newLocation.id)) {
      setValidationError('ID should be 2-5 alphanumeric characters');
      return;
    }
    
    setValidationError('');
    onSave(newLocation);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          Add New Location
        </h2>
      </div>

      {validationError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {validationError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            ID (Short Code) *
          </label>
          <input
            type="text"
            value={newLocation.id}
            onChange={(e) => handleFieldChange('id', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g. SYD, MEL, BRI"
          />
          <p className="text-xs text-gray-500 mt-1">
            2-5 character unique identifier for this location
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City Name *
          </label>
          <input
            type="text"
            value={newLocation.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g. Sydney, Melbourne"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            State *
          </label>
          <select
            value={newLocation.state}
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
            value={newLocation.wreckers}
            onChange={(e) => handleFieldChange('wreckers', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g. 25"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={newLocation.lat}
            onChange={(e) => handleFieldChange('lat', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g. -33.8688"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can find coordinates on Google Maps
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="0.0001"
            value={newLocation.lng}
            onChange={(e) => handleFieldChange('lng', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="e.g. 151.2093"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isHighlightedNew"
            checked={newLocation.isHighlighted}
            onChange={(e) => handleFieldChange('isHighlighted', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isHighlightedNew" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Highlight on map (major city)
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
        >
          Save Location
        </button>
      </div>
    </div>
  );
};

export default NewLocationForm;
