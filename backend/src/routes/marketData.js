const express = require('express');
const router = express.Router();
const marketDataService = require('../services/marketData');
const cacheMiddleware = require('../middleware/cache');

/**
 * Get market trends for a specific car
 */
router.get('/trends/:make/:model', cacheMiddleware(21600), async (req, res) => {
  try {
    const { make, model } = req.params;
    const trends = await marketDataService.getMarketTrends(make, model);
    res.json(trends);
  } catch (error) {
    console.error('Market Trends Route Error:', error);
    res.status(500).json({ error: 'Failed to fetch market trends' });
  }
});

/**
 * Get popular models in a region
 */
router.get('/popular/:region', cacheMiddleware(21600), async (req, res) => {
  try {
    const { region } = req.params;
    const popularModels = await marketDataService.getPopularModels(region);
    res.json(popularModels);
  } catch (error) {
    console.error('Popular Models Route Error:', error);
    res.status(500).json({ error: 'Failed to fetch popular models' });
  }
});

/**
 * Update market data
 */
router.post('/update', async (req, res) => {
  try {
    const result = await marketDataService.updateMarketData(req.body);
    res.json(result);
  } catch (error) {
    console.error('Market Data Update Route Error:', error);
    res.status(500).json({ error: 'Failed to update market data' });
  }
});

module.exports = router;