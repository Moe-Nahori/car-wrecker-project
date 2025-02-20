const express = require('express');
const router = express.Router();
const { cacheUtils } = require('../config/redis');
const cacheMiddleware = require('../middleware/cache');

/**
 * Get car price estimation
 * Uses Redis cache to store and retrieve price calculations
 */
router.get('/estimate/:make/:model/:year', cacheMiddleware(3600), async (req, res) => {
  try {
    const { make, model, year } = req.params;
    
    // Generate cache key for this specific car
    const cacheKey = `car:price:${make}:${model}:${year}`;
    
    // Try to get cached price
    const cachedPrice = await cacheUtils.get(cacheKey);
    if (cachedPrice) {
      return res.json(cachedPrice);
    }

    // If not cached, calculate price (mock calculation for example)
    const calculatedPrice = await calculateCarPrice(make, model, year);
    
    // Cache the calculated price
    await cacheUtils.set(cacheKey, calculatedPrice, 3600); // Cache for 1 hour
    
    res.json(calculatedPrice);
  } catch (error) {
    console.error('Price Estimation Error:', error);
    res.status(500).json({ error: 'Failed to estimate car price' });
  }
});

/**
 * Bulk update car prices
 * Invalidates cache for updated prices
 */
router.post('/bulk-update', async (req, res) => {
  try {
    const { updates } = req.body;
    
    // Process updates and invalidate cache for each updated car
    for (const update of updates) {
      const { make, model, year } = update;
      const cacheKey = `car:price:${make}:${model}:${year}`;
      await cacheUtils.del(cacheKey);
    }

    res.json({ message: 'Prices updated and cache invalidated' });
  } catch (error) {
    console.error('Bulk Update Error:', error);
    res.status(500).json({ error: 'Failed to update prices' });
  }
});

/**
 * Mock function to calculate car price
 */
async function calculateCarPrice(make, model, year) {
  // Simulate complex calculation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    make,
    model,
    year,
    estimatedPrice: Math.floor(Math.random() * 50000) + 10000,
    marketCondition: "Good",
    lastUpdated: new Date().toISOString()
  };
}

module.exports = router;