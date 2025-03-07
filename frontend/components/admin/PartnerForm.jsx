import React, { useState } from 'react';

// Common specialties for selection
const commonSpecialties = [
  'European', 'Japanese', 'Korean', 'American', 'Chinese',
  'SUVs', 'Sedans', 'Trucks', 'Vans', 'Commercial',
  'Luxury', '4x4', 'Utes', 'Classic Cars', 'Vintage',
  'Sports Cars', 'Mining Vehicles', 'Industrial', 'Government Vehicles'
];

const PartnerForm = ({ partner, onSave, onCancel, buttonText = 'Save' }) => {
  const [formData, setFormData] = useState(partner);
  const [validationError, setValidationError] = useState('');

  // Handle field changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Handle specialty changes
  const handleSpecialtyChange = (specialty) => {
    const currentSpecialties = [...formData.specialties];
    const index = currentSpecialties.indexOf(specialty);
    
    if (index > -1) {
      currentSpecialties.splice(index, 1);
    } else {
      currentSpecialties.push(specialty);
    }
    
    setFormData({
      ...formData,
      specialties: currentSpecialties
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.address || !formData.phone) {
      setValidationError('Name, Address, and Phone are required fields');
      return;
    }
    
    setValidationError('');
    onSave(formData);
  };

  return (
    <div className="space-y-3">
      {validationError && (
        <div className="text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">
          {validationError}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Business Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="e.g. Sydney Auto Wreckers"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="e.g. 123 Main Street, Suburb NSW 2000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="e.g. 02 9123 4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Specialties
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {commonSpecialties.map(specialty => (
            <button
              key={specialty}
              type="button"
              onClick={() => handleSpecialtyChange(specialty)}
              className={`px-2 py-1 text-xs rounded-md ${
                formData.specialties.includes(specialty)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {buttonText}
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PartnerForm;
