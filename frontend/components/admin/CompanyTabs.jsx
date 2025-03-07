import React from 'react';
import { Building, Phone, Clock, Globe } from 'lucide-react';

const CompanyTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        <TabItem 
          icon={<Building className="mr-2 w-5 h-5" />}
          label="General"
          value="general"
          activeTab={activeTab}
          onClick={() => setActiveTab('general')}
        />
        <TabItem 
          icon={<Phone className="mr-2 w-5 h-5" />}
          label="Contact"
          value="contact"
          activeTab={activeTab}
          onClick={() => setActiveTab('contact')}
        />
        <TabItem 
          icon={<Clock className="mr-2 w-5 h-5" />}
          label="Business"
          value="business"
          activeTab={activeTab}
          onClick={() => setActiveTab('business')}
        />
        <TabItem 
          icon={<Globe className="mr-2 w-5 h-5" />}
          label="Social Media"
          value="social"
          activeTab={activeTab}
          onClick={() => setActiveTab('social')}
        />
      </ul>
    </div>
  );
};

const TabItem = ({ icon, label, value, activeTab, onClick }) => {
  return (
    <li className="mr-2">
      <button
        onClick={onClick}
        className={`inline-flex items-center py-4 px-4 text-sm font-medium text-center border-b-2 ${
          activeTab === value
            ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
            : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
        }`}
      >
        {icon}
        {label}
      </button>
    </li>
  );
};

export default CompanyTabs;
