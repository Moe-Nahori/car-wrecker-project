import React from 'react';
import { Shield, CreditCard, Leaf, Truck, Clock, DollarSign, Award, CheckCircle } from 'lucide-react';

function WhyChooseSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose iCar Wreckers?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer the best value and service in the industry
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Best Price Guarantee */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">
                  We match any competitor's verified quote and offer the best market rates for your vehicle.
                </p>
              </div>
            </div>
          </div>

          {/* Instant Payment */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Payment</h3>
                <p className="text-gray-600">
                  Choose between immediate bank transfer or cash payment - get paid before your car leaves.
                </p>
              </div>
            </div>
          </div>

          {/* Environmental Certification */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Leaf className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Eco-Friendly Recycling</h3>
                <p className="text-gray-600">
                  All our operations follow certified environmental standards for responsible car recycling.
                </p>
              </div>
            </div>
          </div>

          {/* Free Pickup */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free Pickup Service</h3>
                <p className="text-gray-600">
                  Complimentary same-day car collection available across all major cities and regions.
                </p>
              </div>
            </div>
          </div>

          {/* Professional Service */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed Experts</h3>
                <p className="text-gray-600">
                  Our network consists of fully licensed and insured professional car wreckers.
                </p>
              </div>
            </div>
          </div>

          {/* Easy Process */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hassle-Free Process</h3>
                <p className="text-gray-600">
                  Simple 3-step process with all paperwork handled by our team for a smooth experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;