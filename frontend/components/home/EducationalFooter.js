import React from 'react';
import { BookOpen, HelpCircle, Scale, FileText } from 'lucide-react';
import companyConfig from '../../../config/company.json';

const { company } = companyConfig;

function EducationalFooter() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Resources & Information
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about car wrecking and recycling
          </p>
        </div>
      </div>
    </section>
  );
}

export default EducationalFooter;