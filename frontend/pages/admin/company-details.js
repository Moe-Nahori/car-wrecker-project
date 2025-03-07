import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AlertTriangle, Save, Check } from 'lucide-react';
import { getCompanyConfig } from '@/utils/config';
import CompanyTabs from '@/components/admin/CompanyTabs';
import GeneralInfoTab from '@/components/admin/company-tabs/GeneralInfoTab';
import ContactInfoTab from '@/components/admin/company-tabs/ContactInfoTab';
import BusinessInfoTab from '@/components/admin/company-tabs/BusinessInfoTab';
import SocialMediaTab from '@/components/admin/company-tabs/SocialMediaTab';

const CompanyDetailsAdmin = () => {
  const [companyData, setCompanyData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchCompanyData();
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

  // Fetch company data
  const fetchCompanyData = async () => {
    try {
      // For this app, we use the utility function that reads from the config
      const config = getCompanyConfig();
      setCompanyData(config);
      setOriginalData(JSON.stringify(config));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company data:', error);
      setErrorMessage('Failed to load company data');
      setLoading(false);
    }
  };

  // Save company data
  const saveCompanyData = async () => {
    try {
      const response = await fetch('/api/admin/saveCompanyDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company: companyData }),
      });

      if (!response.ok) {
        throw new Error('Failed to save company data');
      }

      setSuccessMessage('Company details saved successfully');
      setOriginalData(JSON.stringify(companyData));
    } catch (error) {
      console.error('Error saving company data:', error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  // Check if data has been modified
  const isDataDirty = () => {
    return originalData !== JSON.stringify(companyData);
  };

  // Handle field change
  const handleChange = (section, field, value) => {
    if (section === 'root') {
      setCompanyData({
        ...companyData,
        [field]: value
      });
    } else if (section === 'contact.address') {
      setCompanyData({
        ...companyData,
        contact: {
          ...companyData.contact,
          address: {
            ...companyData.contact.address,
            [field]: value
          }
        }
      });
    } else if (section === 'business.openingHours') {
      setCompanyData({
        ...companyData,
        business: {
          ...companyData.business,
          openingHours: {
            ...companyData.business.openingHours,
            [field]: value
          }
        }
      });
    } else {
      setCompanyData({
        ...companyData,
        [section]: {
          ...companyData[section],
          [field]: value
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Company Details Admin | {companyData?.name}</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Company Details Admin
            </h1>
            <div className="flex items-center space-x-4">
              {isDataDirty() && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-md flex items-center">
                  <AlertTriangle size={16} className="mr-2" />
                  Unsaved changes
                </div>
              )}
              <button
                onClick={saveCompanyData}
                disabled={!isDataDirty()}
                className={`px-4 py-2 rounded-md flex items-center ${
                  isDataDirty() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={16} className="mr-2" />
                Save Changes
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

          {/* Tabs */}
          <CompanyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {activeTab === 'general' && (
              <GeneralInfoTab 
                companyData={companyData} 
                handleChange={handleChange}
              />
            )}

            {activeTab === 'contact' && (
              <ContactInfoTab 
                companyData={companyData} 
                handleChange={handleChange}
              />
            )}

            {activeTab === 'business' && (
              <BusinessInfoTab 
                companyData={companyData} 
                handleChange={handleChange}
              />
            )}

            {activeTab === 'social' && (
              <SocialMediaTab 
                companyData={companyData} 
                handleChange={handleChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetailsAdmin;
