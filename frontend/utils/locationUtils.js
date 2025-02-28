import locationData from '../data/wreckerLocations.json';

/**
 * Get all wrecker locations from the data file
 * @returns {Array} All location objects
 */
export const getAllLocations = () => {
  return locationData.locations;
};

/**
 * Get locations that are marked as highlighted
 * @returns {Array} Highlighted location objects
 */
export const getHighlightedLocations = () => {
  return locationData.locations.filter(location => location.isHighlighted);
};

/**
 * Get a specific location by its ID
 * @param {string} id - The location ID
 * @returns {Object|null} The location object or null if not found
 */
export const getLocationById = (id) => {
  return locationData.locations.find(location => location.id === id) || null;
};

/**
 * Get locations by state
 * @param {string} state - State abbreviation (NSW, VIC, etc.)
 * @returns {Array} Locations in the specified state
 */
export const getLocationsByState = (state) => {
  return locationData.locations.filter(location => location.state === state);
};

/**
 * Get total count of all wreckers across locations
 * @returns {number} Total count of wreckers
 */
export const getTotalWreckersCount = () => {
  return locationData.locations.reduce((total, location) => total + location.wreckers, 0);
};

/**
 * Get total count of locations
 * @returns {number} Total count of locations
 */
export const getLocationCount = () => {
  return locationData.locations.length;
};

/**
 * Get participants for a specific location
 * @param {string} locationId - The location ID
 * @returns {Array} Participants in the specified location
 */
export const getParticipantsByLocation = (locationId) => {
  const location = getLocationById(locationId);
  return location ? location.participants : [];
};

/**
 * Sort locations by number of wreckers (descending)
 * @returns {Array} Sorted locations
 */
export const getLocationsSortedByWreckerCount = () => {
  return [...locationData.locations].sort((a, b) => b.wreckers - a.wreckers);
};

/**
 * Search for locations or participants by name
 * @param {string} query - Search query
 * @returns {Object} Object containing matching locations and participants
 */
export const searchLocations = (query) => {
  if (!query || query.trim() === '') {
    return { locations: [], participants: [] };
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  const matchingLocations = locationData.locations.filter(
    location => location.city.toLowerCase().includes(normalizedQuery) || 
                location.state.toLowerCase().includes(normalizedQuery)
  );
  
  const matchingParticipants = [];
  locationData.locations.forEach(location => {
    location.participants.forEach(participant => {
      if (
        participant.name.toLowerCase().includes(normalizedQuery) ||
        participant.address.toLowerCase().includes(normalizedQuery) ||
        participant.specialties.some(s => s.toLowerCase().includes(normalizedQuery))
      ) {
        matchingParticipants.push({
          ...participant,
          locationId: location.id,
          locationName: location.city
        });
      }
    });
  });
  
  return { locations: matchingLocations, participants: matchingParticipants };
};

/**
 * Get mapping data formatted for use with mapping libraries
 * @returns {Array} Array of objects with mapping properties
 */
export const getMapMarkers = () => {
  return locationData.locations.map(location => ({
    id: location.id,
    city: location.city,
    state: location.state,
    position: [location.lat, location.lng],
    wreckers: location.wreckers,
    isHighlighted: location.isHighlighted,
    participantCount: location.participants.length
  }));
};

/**
 * Get states with location counts
 * @returns {Array} Array of state objects with counts
 */
export const getStateStats = () => {
  const states = {};
  
  locationData.locations.forEach(location => {
    if (!states[location.state]) {
      states[location.state] = {
        state: location.state,
        locationCount: 0,
        wreckerCount: 0
      };
    }
    
    states[location.state].locationCount++;
    states[location.state].wreckerCount += location.wreckers;
  });
  
  return Object.values(states);
};
