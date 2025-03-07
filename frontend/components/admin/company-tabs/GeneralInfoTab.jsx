import React from 'react';
import FormField from '../FormField';

const GeneralInfoTab = ({ companyData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">General Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Company Name"
          value={companyData.name}
          onChange={(e) => handleChange('root', 'name', e.target.value)}
        />
        
        <FormField
          label="Legal Name"
          value={companyData.legalName}
          onChange={(e) => handleChange('root', 'legalName', e.target.value)}
        />
        
        <FormField
          label="Slogan"
          value={companyData.meta.slogan}
          onChange={(e) => handleChange('meta', 'slogan', e.target.value)}
        />
        
        <FormField
          label="Description"
          value={companyData.meta.description}
          onChange={(e) => handleChange('meta', 'description', e.target.value)}
        />
        
        <FormField
          label="Established Year"
          value={companyData.meta.established}
          onChange={(e) => handleChange('meta', 'established', e.target.value)}
        />
      </div>
    </div>
  );
};

export default GeneralInfoTab;
