import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MapPin, Search, Filter, ChevronRight, FileText } from 'lucide-react';
import { 
  getAllLocations, 
  getStateStats, 
  getTotalWreckersCount,
  searchLocations
} from '../../utils/locationUtils';

const LocationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  
  const locations = getAllLocations();
  const stateStats = getStateStats();
  const totalWreckers = getTotalWreckersCount();
  
  // Initialize filtered locations list
  useEffect(() => {
    setFilteredLocations(locations.sort((a, b) => b.wreckers - a.wreckers));
  }, []);
  
  // Add "All" state to stats
  const statesWithAll = [
    { state: 'All', locationCount: locations.length, wreckerCount: totalWreckers },
    ...stateStats
  ];
  
  // Filter locations when filters change
  useEffect(() => {
    filterLocations();
  }, [searchQuery, selectedState]);
  
  const filterLocations = () => {
    let results = [...locations];
    
    // Filter by state if not "All"
    if (selectedState !== 'All') {
      results = results.filter(location => location.state === selectedState);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const { locations: searchResults } = searchLocations(searchQuery);
      const searchResultIds = searchResults.map(loc => loc.id);
      results = results.filter(location => searchResultIds.includes(location.id));
    }
    
    // Sort by wrecker count (largest first)
    results.sort((a, b) => b.wreckers - a.wreckers);
    
    setFilteredLocations(results);
  };
  
  // Preload Leaflet resources
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
  
  // Initialize map when the component is mounted on the client
  useEffect(() => {
    if (typeof window !== 'undefined' && mapLoaded && !mapRef.current) {
      const mapContainer = document.getElementById('locations-map');
      if (mapContainer && !mapContainer.hasChildNodes()) {
        try {
          // Get Leaflet from window
          const L = window.L;
          
          // Only proceed if Leaflet is loaded
          if (L) {
            // Initialize map with proper view to include Tasmania
            mapRef.current = L.map('locations-map', {
              zoomControl: true,
              attributionControl: false, // Remove attribution for cleaner look
            }).setView([-29.0, 133.7751], 3.5);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
            }).addTo(mapRef.current);
            
            // Add markers for each location
            locations.forEach(location => {
              const markerSize = location.isHighlighted ? [30, 30] : [25, 25];
              const iconUrl = location.isHighlighted 
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
              
              const mapMarker = L.marker([location.lat, location.lng], { icon }).addTo(mapRef.current);
              
              // Create popup content with styling
              const popupContent = `
                <div style="min-width: 200px;">
                  <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${location.city}, ${location.state}</h3>
                  <p style="margin-bottom: 8px;">${location.wreckers} wreckers available</p>
                  <p style="margin-bottom: 5px; font-size: 14px;">${location.participants.length} participating businesses</p>
                  <a href="/locations/${location.id}" style="color: #2563eb; text-decoration: underline; font-size: 14px;">
                    View details
                  </a>
                </div>
              `;
              
              mapMarker.bindPopup(popupContent);
            });
          }
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      }
    }
  }, [mapLoaded, locations]);
  
  return (
    <>
      <Head>
        <title>Car Wrecker Locations Across Australia | Find Your Nearest Wrecker</title>
        <meta name="description" content="Find car wreckers near you. Our network spans across Australia with over 500 locations ready to offer you top dollar for your vehicle." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Navigation */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-lg hover:text-blue-100">
              iCar Wreckers
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-blue-100">Home</Link>
              <Link href="/quote" className="hover:text-blue-100">Get Quote</Link>
              <Link href="/locations" className="hover:text-blue-100 border-b-2 border-white">Locations</Link>
              <Link href="/contact" className="hover:text-blue-100">Contact</Link>
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="bg-blue-600 dark:bg-blue-800">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Car Wrecker Locations Across Australia
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              With over {totalWreckers} car wreckers across {locations.length} locations, we offer the most extensive coverage in Australia.
            </p>
          </div>
        </div>
        
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Map section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Nationwide Coverage
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Find car wreckers in your area across Australia
              </p>
            </div>
            <div id="locations-map" className="h-[500px] bg-gray-100 dark:bg-gray-700 relative">
              {/* Loading state */}
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading interactive map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Filtering and search */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Find Car Wreckers Near You
              </h2>
              
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* State filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {statesWithAll.map((stateData) => (
                <button
                  key={stateData.state}
                  onClick={() => setSelectedState(stateData.state)}
                  className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none ${
                    selectedState === stateData.state
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {stateData.state === 'All' ? 'All States' : stateData.state} ({stateData.locationCount})
                </button>
              ))}
            </div>
          </div>
          
          {/* Location list */}
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <Link 
                  key={location.id} 
                  href={`/locations/${location.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {location.city}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {location.state}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        location.isHighlighted
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {location.wreckers} wreckers
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span className="font-medium">Featured partners:</span> {location.participants.length}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {location.participants.length ? location.participants[0].name : 'Multiple partners'}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No locations found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No locations match your current search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('All');
                }}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {/* CTA */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Can't find a wrecker in your area?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our network. Contact us and we'll connect you with a reliable car wrecker in your location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us
              </Link>
              <Link 
                href="/quote" 
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Get a Quote Anyway
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LocationsPage;
