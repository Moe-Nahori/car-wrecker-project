import React from 'react';
import { MapPin } from 'lucide-react';

const CoverageMapSection = () => {
  const locations = [
    { city: 'Sydney', wreckers: 124, isHighlighted: true },
    { city: 'Melbourne', wreckers: 117, isHighlighted: true },
    { city: 'Brisbane', wreckers: 98, isHighlighted: true },
    { city: 'Perth', wreckers: 87, isHighlighted: true },
    { city: 'Adelaide', wreckers: 65, isHighlighted: true },
    { city: 'Gold Coast', wreckers: 43, isHighlighted: true },
    { city: 'Newcastle', wreckers: 32, isHighlighted: false },
    { city: 'Canberra', wreckers: 28, isHighlighted: false },
    { city: 'Wollongong', wreckers: 24, isHighlighted: false },
    { city: 'Hobart', wreckers: 19, isHighlighted: false },
    { city: 'Geelong', wreckers: 18, isHighlighted: false },
    { city: 'Townsville', wreckers: 16, isHighlighted: false },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Nationwide Coverage
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            With over 500 wreckers across Australia, we offer the most extensive coverage in the country
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Map placeholder */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 h-full min-h-[400px] relative overflow-hidden shadow-lg">
            {/* Australia Map Outline SVG placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M600,170 C580,150 560,140 520,150 C480,160 460,190 440,200 C420,210 380,220 340,210 C300,200 290,170 270,150 C250,130 210,120 180,140 C150,160 140,200 120,230 C100,260 70,290 60,330 C50,370 60,410 80,440 C100,470 140,490 170,500 C200,510 240,510 270,520 C300,530 330,550 370,560 C410,570 450,570 490,560 C530,550 560,520 590,500 C620,480 650,450 670,420 C690,390 700,350 700,310 C700,270 690,230 670,190 C650,150 620,190 600,170Z"
                  fill="#3B82F6"
                  strokeWidth="2"
                  stroke="#1E40AF"
                />
              </svg>
            </div>
            
            {/* Dots representing major cities */}
            <div className="absolute inset-0">
              {/* Sydney - east coast, lower third */}
              <div className="absolute top-[65%] right-[25%]">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              {/* Melbourne - bottom right */}
              <div className="absolute top-[75%] right-[30%]">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              {/* Brisbane - east coast, middle */}
              <div className="absolute top-[55%] right-[22%]">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              {/* Perth - west coast */}
              <div className="absolute top-[60%] left-[20%]">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              {/* Adelaide - bottom, middle-left */}
              <div className="absolute top-[70%] left-[40%]">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              
              {/* Darwin - top */}
              <div className="absolute top-[20%] left-[35%]">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Text overlay */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow text-sm font-medium text-gray-600 dark:text-gray-300">
              Interactive Australia Map
            </div>
          </div>

          {/* Right side - Location list */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Car Wreckers By Location
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map((location, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${
                    location.isHighlighted 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className={`w-5 h-5 ${
                      location.isHighlighted 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {location.city}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {location.wreckers} wreckers
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We serve all areas of Australia, including regional and remote locations. Can't see your area listed? Contact us for local coverage details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMapSection;