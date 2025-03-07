// Sample value factors for calculation
const valueFactors = {
  condition: {
    'excellent': 1.2,
    'good': 1.0,
    'fair': 0.8,
    'poor': 0.6,
    'scrap': 0.4
  },
  age: {
    // Current year minus manufacture year
    0: 1.5,  // New car
    1: 1.3,
    2: 1.2,
    3: 1.1,
    4: 1.0,
    5: 0.9,
    10: 0.7,
    15: 0.5,
    20: 0.3,
    25: 0.2
  },
  features: {
    hasKeys: 1.05,
    hasWheels: 1.1,
    isRegistered: 1.15,
    hasCatalytic: 1.1
  },
  engineType: {
    'petrol': 1.0,
    'diesel': 1.15,
    'hybrid': 1.2,
    'electric': 1.25
  }
};

/**
 * Calculate a quote value based on vehicle information
 * @param {Object} quoteData - The quote data object
 * @returns {Object} The quote result with amount and pickup details
 */
export const calculateQuote = (quoteData) => {
  // Base value based on make and model
  let baseValue = 500;
  
  // Adjust for premium brands
  const premiumBrands = ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche'];
  if (premiumBrands.includes(quoteData.make)) {
    baseValue += 300;
  }
  
  // Age factor
  const currentYear = new Date().getFullYear();
  const ageYears = currentYear - quoteData.year;
  let ageFactor = 0.3; // default for old cars
  
  // Find the closest age bracket
  Object.entries(valueFactors.age).forEach(([age, factor]) => {
    if (ageYears >= parseInt(age) && factor > ageFactor) {
      ageFactor = factor;
    }
  });
  
  // Condition factor
  const conditionFactor = valueFactors.condition[quoteData.condition] || 0.5;
  
  // Features factors
  let featureMultiplier = 1.0;
  if (quoteData.hasKeys) featureMultiplier *= valueFactors.features.hasKeys;
  if (quoteData.hasWheels) featureMultiplier *= valueFactors.features.hasWheels;
  if (quoteData.isRegistered) featureMultiplier *= valueFactors.features.isRegistered;
  if (quoteData.hasCatalytic) featureMultiplier *= valueFactors.features.hasCatalytic;
  
  // Engine type factor
  const engineFactor = valueFactors.engineType[quoteData.engineType] || 1.0;
  
  // Calculate final quote value
  let quoteValue = baseValue * ageFactor * conditionFactor * featureMultiplier * engineFactor;
  
  // Round to nearest $10
  quoteValue = Math.round(quoteValue / 10) * 10;
  
  // Add random variation to make it seem more realistic (±10%)
  const variation = 0.9 + (Math.random() * 0.2); // 0.9 to 1.1
  quoteValue = Math.round(quoteValue * variation);
  
  // Ensure minimum value of $100
  quoteValue = Math.max(quoteValue, 100);
  
  // Return quote result
  return {
    amount: quoteValue,
    estimatedPickupDays: Math.floor(Math.random() * 3) + 1, // 1-3 days
    guaranteedDays: 7, // Price guarantee period
    bonusAmount: Math.round(quoteValue * 0.05) // 5% bonus for quick acceptance
  };
};

export default calculateQuote;