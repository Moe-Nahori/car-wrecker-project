import React from 'react';
import FormField from '../FormField';

const ContactInfoTab = ({ companyData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Phone Number"
          value={companyData.contact.phone}
          onChange={(e) => handleChange('contact', 'phone', e.target.value)}
          placeholder="+61 412 345 678"
        />
        
        <FormField
          label="Email Address"
          type="email"
          value={companyData.contact.email}
          onChange={(e) => handleChange('contact', 'email', e.target.value)}
          placeholder="info@example.com.au"
        />
      </div>

      <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-8 mb-4">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Street"
          value={companyData.contact.address.street}
          onChange={(e) => handleChange('contact.address', 'street', e.target.value)}
          placeholder="123 Main Street"
        />
        
        <FormField
          label="Suburb"
          value={companyData.contact.address.suburb}
          onChange={(e) => handleChange('contact.address', 'suburb', e.target.value)}
          placeholder="Suburb"
        />
        
        <FormField
          label="State"
          value={companyData.contact.address.state}
          onChange={(e) => handleChange('contact.address', 'state', e.target.value)}
          placeholder="NSW, VIC, etc."
        />
        
        <FormField
          label="Postcode"
          value={companyData.contact.address.postcode}
          onChange={(e) => handleChange('contact.address', 'postcode', e.target.value)}
          placeholder="2000"
        />
        
        <FormField
          label="Country"
          value={companyData.contact.address.country}
          onChange={(e) => handleChange('contact.address', 'country', e.target.value)}
          placeholder="Australia"
        />
      </div>
    </div>
  );
};

export default ContactInfoTab;
