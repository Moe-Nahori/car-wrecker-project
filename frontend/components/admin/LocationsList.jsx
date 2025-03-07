import React from 'react';
import { MapPin, Plus } from 'lucide-react';

const LocationsList = ({ locations, selectedLocationId, onSelectLocation, onAddLocation }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Locations</h2>
        <button
          onClick={onAddLocation}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Add Location
        </button>
      </div>
      
      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {locations.map(location => (
          <div
            key={location.id}
            onClick={() => onSelectLocation(location)}
            className={`p-3 rounded-md cursor-pointer ${
              selectedLocationId === location.id
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {location.city}, {location.state}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {location.wreckers} wreckers • {location.participants.length} partners
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {locations.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No locations available. Add your first location to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsList;
