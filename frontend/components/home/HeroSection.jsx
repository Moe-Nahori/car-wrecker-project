import React from 'react';
import { MapPin, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import { getCompanyName, getCompanyMeta } from '../../utils/config';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const router = useRouter();
  
  // Get company data from config
  const companyName = getCompanyName();
  const companyMeta = getCompanyMeta();
  
  const handleGetValuation = () => {
    router.push('/quote');
  };
  
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Value Proposition */}
          <div className="space-y-6 pt-4">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Get Top Dollar for Your Unwanted Vehicle
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Instant valuations from Australia's largest network of licensed car wreckers
              </p>
              <button
                onClick={handleGetValuation}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg"
              >
                GET YOUR FREE VALUATION NOW
              </button>
              
              <div className="flex items-center mt-4 space-x-2 text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Trusted by 50,000+ Australians across the country</span>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-2xl">25,000+</div>
                  <div className="text-sm text-gray-600">Cars Purchased</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-2xl">500+</div>
                  <div className="text-sm text-gray-600">Locations</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-2xl">Est. {companyMeta.established}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-2xl">Same Day</div>
                  <div className="text-sm text-gray-600">Payment</div>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                Licensed Operator
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                Insured Service
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                Eco-Certified
              </div>
              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs flex items-center">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                ABN Registered
              </div>
            </div>
          </div>

          {/* Right Column - Professional Image */}
          <div className="lg:mt-0 mt-4">
            <div className="rounded-xl shadow-xl overflow-hidden">
              <div className="h-[480px] relative">
                <Image 
                  src="/images/hero/professional_car_removal.jpg" 
                  alt="Professional car removal service" 
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;