import React, { useState } from 'react';
import { ChevronLeft, MapPin, Search, Phone } from 'lucide-react';
import Link from 'next/link';

const LocationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample locations data - in a real app, this would come from an API or database
  const locations = [
    {
      id: 1,
      name: 'Sydney City Wreckers',
      address: '123 Car Street, Sydney NSW 2000',
      phone: '(02) 1234 5678',
      hours: 'Mon-Sat: 8am-6pm, Sun: 9am-4pm',
      state: 'NSW'
    },
    {
      id: 2,
      name: 'Western Sydney Auto Recyclers',
      address: '45 Vehicle Road, Parramatta NSW 2150',
      phone: '(02) 8765 4321',
      hours: 'Mon-Fri: 7:30am-5:30pm, Sat: 8am-4pm',
      state: 'NSW'
    },
    {
      id: 3,
      name: 'Melbourne Metro Car Buyers',
      address: '78 Auto Lane, Melbourne VIC 3000',
      phone: '(03) 2345 6789',
      hours: 'Mon-Sat: 8am-6pm, Sun: Closed',
      state: 'VIC'
    },
    {
      id: 4,
      name: 'Brisbane North Wreckers',
      address: '90 Scrap Avenue, Brisbane QLD 4000',
      phone: '(07) 3456 7890',
      hours: 'Mon-Fri: 8am-5pm, Sat-Sun: 9am-3pm',
      state: 'QLD'
    },
    {
      id: 5,
      name: 'Gold Coast Car Removal',
      address: '12 Beach Road, Gold Coast QLD 4217',
      phone: '(07) 6543 2109',
      hours: '24/7 Service Available',
      state: 'QLD'
    },
    {
      id: 6,
      name: 'Perth Central Auto Wreckers',
      address: '34 West Drive, Perth WA 6000',
      phone: '(08) 9876 5432',
      hours: 'Mon-Sat: 8am-5:30pm, Sun: Closed',
      state: 'WA'
    },
    {
      id: 7,
      name: 'Adelaide Car Buyers',
      address: '56 South Terrace, Adelaide SA 5000',
      phone: '(08) 1234 9876',
      hours: 'Mon-Fri: 8:30am-5:30pm, Sat: 9am-4pm',
      state: 'SA'
    },
    {
      id: 8,
      name: 'Hobart Auto Recyclers',
      address: '78 River Road, Hobart TAS 7000',
      phone: '(03) 9876 1234',
      hours: 'Mon-Fri: 8am-5pm, Sat: 9am-2pm',
      state: 'TAS'
    }
  ];

  // Filter locations based on search query
  const filteredLocations = locations.filter(location => {
    const searchTerms = searchQuery.toLowerCase();
    return (
      location.name.toLowerCase().includes(searchTerms) ||
      location.address.toLowerCase().includes(searchTerms) ||
      location.state.toLowerCase().includes(searchTerms)
    );
  });

  // Group locations by state
  const groupedLocations = filteredLocations.reduce((acc, location) => {
    if (!acc[location.state]) {
      acc[location.state] = [];
    }
    acc[location.state].push(location);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Locations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find your nearest car wrecker location from our nationwide network
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by location, suburb, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div className="space-y-8">
          {Object.keys(groupedLocations).length > 0 ? (
            Object.entries(groupedLocations).map(([state, stateLocations]) => (
              <div key={state} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-4">
                  <h2 className="text-xl font-semibold">{state} Locations</h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {stateLocations.map((location) => (
                    <div key={location.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {location.name}
                          </h3>
                          <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                            <span>{location.address}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <Phone className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                            <span>{location.phone}</span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {location.hours}
                          </div>
                          <Link 
                            href={`/quote?location=${encodeURIComponent(location.name)}`}
                            className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                          >
                            Get Quote
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-300">No locations found matching your search.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Don't see a location near you? We still might service your area!
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;