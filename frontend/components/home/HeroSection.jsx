import React, { useState } from 'react';
import { MapPin, Shield, Award, Clock } from 'lucide-react';
import { useRouter } from 'next/router';

const HeroSection = () => {
  const [carMake, setCarMake] = useState('');
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/quote?make=${encodeURIComponent(carMake)}`);
  };
  
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Value Proposition */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Get Top Cash For Your Car <span className="text-blue-600 dark:text-blue-400">Today</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Australia's largest network of car wreckers. Instant quotes, same-day pickup, immediate payment.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-bold text-2xl">20,000+</div>
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
                  <div className="font-bold text-2xl">10+ Years</div>
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
          </div>

          {/* Right Column - Quick Quote Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get An Instant Quote</h2>
                <p className="text-gray-600 dark:text-gray-300">Enter your car details for an immediate valuation</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Car Make (e.g., Toyota)" 
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  className="w-full text-lg py-4 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  Get Free Quote Now
                </button>
              </form>

              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                  Instant Quote
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  Free Pickup
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                  Same Day Payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;