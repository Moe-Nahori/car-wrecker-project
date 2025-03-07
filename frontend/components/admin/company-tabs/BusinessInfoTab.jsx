import React from 'react';
import FormField from '../FormField';

const BusinessInfoTab = ({ companyData, handleChange }) => {
  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Business Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="ABN"
          value={companyData.business.abn}
          onChange={(e) => handleChange('business', 'abn', e.target.value)}
          placeholder="12 345 678 901"
          helpText="Australian Business Number"
        />
        
        <FormField
          label="ACN"
          value={companyData.business.acn}
          onChange={(e) => handleChange('business', 'acn', e.target.value)}
          placeholder="123 456 789"
          helpText="Australian Company Number"
        />
      </div>

      <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-8 mb-4">Opening Hours</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {daysOfWeek.map((day) => (
          <FormField
            key={day.key}
            label={day.label}
            value={companyData.business.openingHours[day.key]}
            onChange={(e) => handleChange('business.openingHours', day.key, e.target.value)}
            placeholder="8:00 AM - 5:00 PM"
            helpText="Use 'Closed' for days off"
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessInfoTab;
