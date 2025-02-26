import React, { useState } from 'react';
import { Shield, Info, Car, Calendar, MapPin, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/router';

const ValuationToolSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    condition: 'Good',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct query string with all form data
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`/quote?${queryParams}`);
  };

  // Sample data for dropdowns
  const carMakes = ['Toyota', 'Holden', 'Ford', 'Mazda', 'Hyundai', 'Kia', 'Mitsubishi', 'Nissan', 'BMW', 'Mercedes'];
  
  // We would dynamically populate this based on selected make in a real app
  const carModels = {
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Kluger'],
    Ford: ['Ranger', 'Focus', 'Falcon', 'Territory', 'Escape'],
    // ... other makes and their models
  };

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
  
  const conditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Not Running'];
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-850">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Get Your Instant Car Valuation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Enter your vehicle details below for an accurate estimate
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-blue-100 dark:border-blue-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Make */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <Car className="w-4 h-4 mr-1 text-blue-600" />
                  Car Make
                </label>
                <select 
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Make</option>
                  {carMakes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              {/* Car Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <Car className="w-4 h-4 mr-1 text-blue-600" />
                  Car Model
                </label>
                <select 
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!formData.make}
                >
                  <option value="">Select Model</option>
                  {formData.make && carModels[formData.make]?.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                  Year of Manufacture
                </label>
                <select 
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <CheckSquare className="w-4 h-4 mr-1 text-blue-600" />
                  Current Condition
                </label>
                <select 
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                  Location (City/Postcode)
                </label>
                <input 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Sydney or 2000"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <Info className="w-4 h-4 mr-1 text-blue-600" />
                  Brief Description (Optional)
                </label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Any additional details about your vehicle..."
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 py-3 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Shield className="w-4 h-4 mr-1 text-green-600" />
                <span>Your data is secure and will never be shared</span>
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition-colors duration-200 shadow-lg w-full md:w-auto text-lg"
              >
                Get Free Valuation
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Instant Quote
            </div>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 text-sm flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Free Pickup
            </div>
            <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200 text-sm flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Same Day Payment
            </div>
            <div className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200 text-sm flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Best Price Guarantee
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">Accurate Valuations</p>
            <p>Our valuation system uses real-time market data to ensure you get the most competitive offer for your vehicle, regardless of its condition.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuationToolSection;