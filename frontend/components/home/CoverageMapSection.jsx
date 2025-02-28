import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  getAllLocations, 
  getHighlightedLocations,
  getMapMarkers,
  getTotalWreckersCount 
} from '../../utils/locationUtils';

const CoverageMapSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef(null);
  const router = useRouter();
  
  const locations = getAllLocations();
  const mapMarkers = getMapMarkers();
  const totalWreckers = getTotalWreckersCount();
  
  // Preload the map scripts earlier
  useEffect(() => {
    // Add Leaflet CSS manually to improve loading speed
    if (typeof window !== 'undefined' && !document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);
      
      // Add script
      const script = document.createElement('script');
      script.id = 'leaflet-script';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.crossOrigin = '';
      script.async = true;
      script.onload = () => {
        console.log('Leaflet loaded successfully');
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.L) {
      setMapLoaded(true);
    }
    
    // Cleanup function
    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
          mapRef.current = null;
        } catch (error) {
          console.error("Error cleaning up map:", error);
        }
      }
    };
  }, []);
  
  // Initialize map once components are mounted and scripts are loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && mapLoaded && !mapRef.current) {
      // Check if map container exists and map isn't already initialized
      const mapContainer = document.getElementById('australia-map');
      if (mapContainer && !mapContainer.hasChildNodes()) {
        try {
          // Get Leaflet from window
          const L = window.L;
          
          // Only proceed if Leaflet is loaded
          if (L) {
            // Initialize the map centered on Australia - adjusted to include Tasmania
            // Use a slightly wider view and move center south a bit to include Tasmania
            mapRef.current = L.map('australia-map', {
              zoomControl: true,
              attributionControl: false, // Remove attribution for cleaner look
            }).setView([-29.0, 133.7751], 3.5);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
            }).addTo(mapRef.current);
            
            // Add markers for each location
            mapMarkers.forEach(marker => {
              const markerSize = marker.isHighlighted ? [30, 30] : [25, 25];
              const iconUrl = marker.isHighlighted 
                ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
                : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png';
                
              const icon = L.icon({
                iconUrl: iconUrl,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: markerSize,
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });
              
              const mapMarker = L.marker(marker.position, { icon }).addTo(mapRef.current);
              
              // Create popup content with styling
              const popupContent = `
                <div style="min-width: 200px;">
                  <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${marker.city}, ${marker.state}</h3>
                  <p style="margin-bottom: 8px;">${marker.wreckers} wreckers available</p>
                  <p style="margin-bottom: 5px; font-size: 14px;">${marker.participantCount} participating businesses</p>
                  <a href="/locations/${marker.id}" style="color: #2563eb; text-decoration: underline; font-size: 14px;">
                    View details
                  </a>
                </div>
              `;
              
              mapMarker.bindPopup(popupContent);
              
              // Handle click event on marker
              mapMarker.on('click', () => {
                const locationData = locations.find(loc => loc.id === marker.id);
                setSelectedLocation(locationData);
              });
            });
          }
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      }
    }
  }, [mapLoaded, mapMarkers, locations]);
  
  // Handle location click to navigate to location page
  const handleLocationClick = (location) => {
    router.push(`/locations/${location.id}`);
  };
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Nationwide Coverage
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            With over {totalWreckers} wreckers across Australia, we offer the most extensive coverage in the country
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Interactive Map */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full min-h-[400px] relative overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <div id="australia-map" className="w-full h-[500px] rounded-lg z-10"></div>
            
            {/* Loading state or fallback */}
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading interactive map...</p>
                </div>
              </div>
            )}
            
            {/* Map info overlay */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Major cities</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>Regional locations</span>
              </div>
            </div>
          </div>

          {/* Right side - Location list with details */}
          <div>
            {/* Top card with location list */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-lg mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Car Wreckers By Location
                </h3>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {isExpanded ? "Show less" : "Show all"}
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(isExpanded ? locations : locations.filter(l => l.isHighlighted)).map((location) => (
                  <div 
                    key={location.id} 
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedLocation?.id === location.id
                        ? 'bg-blue-100 dark:bg-blue-800 border border-blue-200 dark:border-blue-700' 
                        : location.isHighlighted 
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/50' 
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className={`w-5 h-5 ${
                        selectedLocation?.id === location.id
                          ? 'text-blue-700 dark:text-blue-300'
                          : location.isHighlighted 
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
            </div>
            
            {/* Selected location details */}
            {selectedLocation && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-blue-100 dark:border-blue-900">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedLocation.city}, {selectedLocation.state} Details
                  </h4>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Close
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium">Total wreckers:</span> {selectedLocation.wreckers}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Featured participants:</span> {selectedLocation.participants.length}
                  </p>
                </div>
                
                <div className="space-y-4 mt-6">
                  <h5 className="font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Featured Participants
                  </h5>
                  
                  {selectedLocation.participants.map((participant, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg"
                    >
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {participant.name}
                      </p>
                      <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{participant.address}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center mt-4">
                    <Link 
                      href={`/locations/${selectedLocation.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                    >
                      View all wreckers in {selectedLocation.city}
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {!selectedLocation && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">Quick Response in Every Location</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We serve all areas of Australia, including regional and remote locations. Can't see your area listed? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> for local coverage details.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMapSection;
