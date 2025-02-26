import React from 'react';
import { Phone } from 'lucide-react';

const StickyCallButton = ({ phoneNumber }) => {
  const formattedNumber = phoneNumber?.replace(/\s+/g, '') || '+61412345678';
  
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a 
        href={`tel:${formattedNumber}`}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
};

export default StickyCallButton;