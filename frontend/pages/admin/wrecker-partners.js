import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AlertTriangle, Save, Check } from 'lucide-react';
import { getAllLocations } from '@/utils/locationUtils';
import { getCompanyName } from '@/utils/config';
import LocationsList from '@/components/admin/LocationsList';
import LocationDetails from '@/components/admin/LocationDetails';
import NewLocationForm from '@/components/admin/NewLocationForm';

const WreckerPartnersAdmin = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addingLocation, setAddingLocation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  
  const companyName = getCompanyName();

  // Load locations data on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Reset messages after 5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Fetch locations data from the server
  const fetchLocations = async () => {
    try {
      // In a real app, you would fetch from an API endpoint
      // For this case, we'll use the utility function that reads from the JSON file
      const allLocations = getAllLocations();
      setLocations(allLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setErrorMessage('Failed to load location data');
    }
  };

  // Save locations data to the server/file
  const saveLocations = async () => {
    try {
      const response = await fetch('/api/admin/saveWreckerLocations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locations }),
      });

      if (!response.ok) {
        throw new Error('Failed to save location data');
      }

      setSuccessMessage('Locations saved successfully');
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving locations:', error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  // Handler for adding a new location
  const handleAddLocation = () => {
    setAddingLocation(true);
    setSelectedLocation(null);
  };

  // Handler for saving a new location
  const handleSaveNewLocation = (newLocation) => {
    if (!newLocation.id || !newLocation.city || !newLocation.state) {
      setErrorMessage('ID, City and State are required fields');
      return;
    }

    if (locations.some(loc => loc.id === newLocation.id)) {
      setErrorMessage('Location ID already exists');
      return;
    }

    const updatedLocations = [...locations, { ...newLocation, participants: [] }];
    setLocations(updatedLocations);
    setAddingLocation(false);
    setIsDirty(true);
  };

  // Handler for selecting a location
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setAddingLocation(false);
  };

  // Handler for updating a location
  const handleUpdateLocation = (updatedLocation) => {
    const updatedLocations = locations.map(loc => 
      loc.id === updatedLocation.id ? updatedLocation : loc
    );
    
    setLocations(updatedLocations);
    setSelectedLocation(updatedLocation);
    setIsDirty(true);
  };

  // Handler for deleting a location
  const handleDeleteLocation = (locationId) => {
    if (confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
      const updatedLocations = locations.filter(loc => loc.id !== locationId);
      setLocations(updatedLocations);
      setSelectedLocation(null);
      setIsDirty(true);
    }
  };

  // Handler for cancelling an operation
  const handleCancel = () => {
    setAddingLocation(false);
  };

  return (
    <>
      <Head>
        <title>Wrecker Partners Admin | {companyName}</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Wrecker Partners Admin
            </h1>
            <div className="flex items-center space-x-4">
              {isDirty && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-md flex items-center">
                  <AlertTriangle size={16} className="mr-2" />
                  Unsaved changes
                </div>
              )}
              <button
                onClick={saveLocations}
                disabled={!isDirty}
                className={`px-4 py-2 rounded-md flex items-center ${
                  isDirty 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={16} className="mr-2" />
                Save All Changes
              </button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
              <Check size={16} className="inline-block mr-2" />
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              <AlertTriangle size={16} className="inline-block mr-2" />
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Locations list */}
            <div className="lg:col-span-1">
              <LocationsList 
                locations={locations}
                selectedLocationId={selectedLocation?.id}
                onSelectLocation={handleSelectLocation}
                onAddLocation={handleAddLocation}
              />
            </div>

            {/* Center/Right columns - Details and editing */}
            <div className="lg:col-span-2">
              {selectedLocation ? (
                <LocationDetails
                  location={selectedLocation}
                  onUpdateLocation={handleUpdateLocation}
                  onDeleteLocation={handleDeleteLocation}
                />
              ) : addingLocation ? (
                <NewLocationForm
                  onSave={handleSaveNewLocation}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a location from the list or add a new one to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WreckerPartnersAdmin;
