import React from 'react';
import { MapPin } from 'lucide-react';

function NetworkSection() {
  const locations = [
    {
      city: "Perth Metropolitan Area",
      description: "Covering all suburbs with same-day pickup available",
      partners: "50+ partners"
    },
    {
      city: "Sydney Region",
      description: "Full coverage across Greater Sydney and Central Coast",
      partners: "100+ partners"
    },
    {
      city: "Melbourne Metro",
      description: "Servicing all Melbourne suburbs and surrounding areas",
      partners: "80+ partners"
    },
    {
      city: "Brisbane & Gold Coast",
      description: "Complete coverage from Brisbane to Gold Coast",
      partners: "60+ partners"
    },
    {
      city: "Adelaide Region",
      description: "Serving Adelaide and surrounding suburbs",
      partners: "40+ partners"
    },
    {
      city: "Canberra Area",
      description: "Coverage across ACT and surrounding regions",
      partners: "30+ partners"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nationwide Coverage
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            With partners across Australia, we're ready to pick up your car anywhere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">{location.city}</h3>
              </div>
              <p className="text-gray-600 mb-3">
                {location.description}
              </p>
              <div className="text-sm font-medium text-blue-600">
                {location.partners}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Don't see your location? Contact us - we likely have partners in your area
          </p>
        </div>
      </div>
    </section>
  );
}

export default NetworkSection;