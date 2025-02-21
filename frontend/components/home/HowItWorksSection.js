import React from 'react';
import { ClipboardList, Truck, BanknoteIcon } from 'lucide-react';  // Changed BankNote to BanknoteIcon

function HowItWorksSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our nationwide network ensures you get the best value for your car. Fast, easy, and hassle-free process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">1. Get a Quote</h3>
              <p className="text-gray-600">
                Enter your car details and receive an instant valuation based on current market rates across Australia.
              </p>
              <div className="text-sm font-medium text-blue-600">Takes 2 minutes</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">2. Free Pickup</h3>
              <p className="text-gray-600">
                We'll connect you with the nearest wrecker partner for inspection and collection at your preferred time.
              </p>
              <div className="text-sm font-medium text-blue-600">Same day available</div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <BanknoteIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">3. Get Paid</h3>
              <p className="text-gray-600">
                Choose your payment method - instant bank transfer or cash payment. Get paid before your car is taken.
              </p>
              <div className="text-sm font-medium text-blue-600">Instant payment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;