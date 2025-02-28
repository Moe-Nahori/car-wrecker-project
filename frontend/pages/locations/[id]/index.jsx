import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

// Import location data directly to skip utility functions
import locationData from '../../../data/wreckerLocations.json';

export default function LocationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  // Preload the Leaflet script - doing this first and early
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Preload Leaflet assets in parallel
      const preloadLeaflet = async () => {
        // Check if Leaflet is already loaded
        if (!document.getElementById('leaflet-css')) {
          // Add stylesheet
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.crossOrigin = '';
          document.head.appendChild(link);
          
          // Add script with browser cache
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
          // If already loaded
          setMapLoaded(true);
        }
      };
      
      preloadLeaflet();
    }
    
    // Cleanup function
    return () => {
      // This ensures map cleanup when component unmounts
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
  
  // Fetch location data when id changes
  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      setIsLoading(true);
      try {
        // Find location directly from the imported data - do this very quickly
        const foundLocation = locationData.locations.find(loc => loc.id === id) || null;
        setLocation(foundLocation);
        
        // Clean up previous map when location changes
        if (mapRef.current) {
          try {
            mapRef.current.remove();
            mapRef.current = null;
          } catch (error) {
            console.error("Error removing previous map:", error);
          }
        }
      } catch (error) {
        console.error("Error loading location:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [id]);
  
  // Initialize or update map when needed - optimized for speed
  useEffect(() => {
    // Make sure we have everything we need before trying to create a map
    if (
      typeof window !== 'undefined' &&
      mapLoaded &&
      location &&
      window.L && 
      !mapRef.current &&
      mapContainerRef.current
    ) {
      // Small delay to ensure DOM is ready
      const initMapTimer = setTimeout(() => {
        try {
          console.log(`Initializing map for ${location.city}...`);
          
          // Create new map
          mapRef.current = window.L.map(mapContainerRef.current, {
            zoomControl: true,
            attributionControl: false,
            preferCanvas: true, // Use canvas for better performance
          });
          
          // Add tile layer with error handling - using faster CDN
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 6,
          }).addTo(mapRef.current);
          
          // Set view safely - slightly zoomed out for better performance
          mapRef.current.setView([location.lat, location.lng], 9);
          
          // Add marker
          const marker = window.L.marker([location.lat, location.lng]).addTo(mapRef.current);
          marker.bindPopup(`<b>${location.city}, ${location.state}</b><br>${location.wreckers} wreckers available`).openPopup();
          
          // Add circle
          window.L.circle([location.lat, location.lng], {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.1,
            radius: 25000
          }).addTo(mapRef.current);
          
        } catch (error) {
          console.error("Error initializing map:", error);
          // Reset the map ref on error
          mapRef.current = null;
        }
      }, 10); // Shorter delay for faster loading
      
      return () => clearTimeout(initMapTimer);
    }
  }, [mapLoaded, location, mapContainerRef.current]);
  
  // Show loading state
  if (isLoading || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Handle location not found
  if (!location) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Location Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">We couldn't find the location you're looking for.</p>
        <Link href="/locations" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          View All Locations
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Car Wreckers in {location.city}, {location.state} | Australia's Largest Network</title>
        <meta name="description" content={`Find the best car wreckers in ${location.city}, ${location.state}. ${location.wreckers} wreckers ready to buy your car for top dollar.`} />
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
        
        {/* Breadcrumbs */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Home
              </Link>
              <span className="text-gray-400 dark:text-gray-600">/</span>
              <Link href="/locations" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Locations
              </Link>
              <span className="text-gray-400 dark:text-gray-600">/</span>
              <span className="text-gray-900 dark:text-white font-medium">{location.city}</span>
            </div>
          </div>
        </div>
        
        {/* Header */}
        <header className="bg-blue-600 dark:bg-blue-800">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center sm:text-left">
            <Link href="/locations" className="inline-flex items-center text-white mb-4 hover:underline">
              ← Back to all locations
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Car Wreckers in {location.city}, {location.state}
            </h1>
            <p className="mt-2 text-xl text-blue-100">
              {location.wreckers} wreckers ready to purchase your vehicle
            </p>
            
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white">
              <span>Most wreckers respond within 30 minutes</span>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Map section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {location.city} Coverage Map
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Our network covers all areas in and around {location.city}
              </p>
            </div>
            <div 
              ref={mapContainerRef} 
              className="h-96 bg-gray-100 dark:bg-gray-700 relative"
            >
              {/* Loading state */}
              {(!mapLoaded || !mapRef.current) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Featured partners */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Car Wrecking Partners in {location.city}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.participants.map((partner, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {partner.name}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">📍</span>
                        <p className="ml-3 text-gray-600 dark:text-gray-300">
                          {partner.address}
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">📞</span>
                        <p className="ml-3 text-gray-600 dark:text-gray-300">
                          {partner.phone}
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">🔧</span>
                        <div className="ml-3">
                          <p className="text-gray-700 dark:text-gray-200 font-medium">Specialties</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {partner.specialties.map((specialty, idx) => (
                              <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <Link 
                        href={`/quote?location=${encodeURIComponent(location.city)}&partner=${encodeURIComponent(partner.name)}`}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                      >
                        Get quote
                      </Link>
                      <button className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
                        <span className="mr-1">📞</span>
                        Call now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {location.wreckers > location.participants.length && (
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We have {location.wreckers - location.participants.length} more wreckers available in {location.city}.
                </p>
                <Link 
                  href="/quote" 
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200"
                >
                  Get quotes from all wreckers
                </Link>
              </div>
            )}
          </div>
          
          {/* Location info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0">ℹ️</span>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  About Car Wrecking in {location.city}
                </h3>
                <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p>
                    Our network of professional car wreckers in {location.city} offers top-dollar cash payments for all types of vehicles, regardless of condition. From unwanted cars and trucks to vans and SUVs, our local partners handle the entire process from valuation to pickup and payment.
                  </p>
                  <p>
                    All wreckers in our {location.city} network are licensed, insured, and follow strict environmental guidelines for responsible recycling. We guarantee same-day service in most areas of {location.city} with free towing included in your quote.
                  </p>
                  <h4>Common services in {location.city}:</h4>
                  <ul>
                    <li>Free vehicle removal and towing</li>
                    <li>Instant cash payments</li>
                    <li>All paperwork handled for you</li>
                    <li>Environmentally-friendly disposal</li>
                    <li>Parts recycling and salvage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
