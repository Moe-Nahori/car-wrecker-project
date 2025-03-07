import React from 'react';
import FormField from '../FormField';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const SocialMediaTab = ({ companyData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Social Media Profiles</h2>
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mt-2 mr-4">
            <Facebook className="text-blue-600 w-6 h-6" />
          </div>
          <div className="flex-1">
            <FormField
              label="Facebook URL"
              value={companyData.social.facebook}
              onChange={(e) => handleChange('social', 'facebook', e.target.value)}
              placeholder="https://facebook.com/yourbusiness"
              helpText="Full URL to your Facebook page"
            />
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-2 mr-4">
            <Instagram className="text-pink-600 w-6 h-6" />
          </div>
          <div className="flex-1">
            <FormField
              label="Instagram URL"
              value={companyData.social.instagram}
              onChange={(e) => handleChange('social', 'instagram', e.target.value)}
              placeholder="https://instagram.com/yourbusiness"
              helpText="Full URL to your Instagram profile"
            />
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-2 mr-4">
            <Linkedin className="text-blue-700 w-6 h-6" />
          </div>
          <div className="flex-1">
            <FormField
              label="LinkedIn URL"
              value={companyData.social.linkedin}
              onChange={(e) => handleChange('social', 'linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/yourbusiness"
              helpText="Full URL to your LinkedIn company page"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mt-6">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Social Media Best Practices</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc pl-4">
            <li>Use complete URLs including https://</li>
            <li>Leave fields blank if you don't have those accounts</li>
            <li>Make sure all links open to your correct profiles</li>
            <li>Update these links whenever your social handles change</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaTab;
