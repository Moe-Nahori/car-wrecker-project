const { cacheUtils } = require('../config/redis');

class MarketDataService {
  constructor() {
    this.CACHE_DURATION = process.env.CACHE_DURATION_MARKET_DATA || 21600; // 6 hours
    this.CACHE_KEY_PREFIX = 'market:data:';
  }

  /**
   * Get market trends for a specific car make/model
   */
  async getMarketTrends(make, model) {
    const cacheKey = `${this.CACHE_KEY_PREFIX}trends:${make}:${model}`;
    
    try {
      // Try to get from cache first
      const cachedData = await cacheUtils.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      // If not in cache, fetch from database/external service
      const marketData = await this.fetchMarketData(make, model);
      
      // Cache the results
      await cacheUtils.set(cacheKey, marketData, this.CACHE_DURATION);
      
      return marketData;
    } catch (error) {
      console.error('Market Trends Error:', error);
      throw new Error('Failed to retrieve market trends');
    }
  }

  /**
   * Get popular car models in a specific region
   */
  async getPopularModels(region) {
    const cacheKey = `${this.CACHE_KEY_PREFIX}popular:${region}`;
    
    try {
      const cachedData = await cacheUtils.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const popularModels = await this.fetchPopularModels(region);
      await cacheUtils.set(cacheKey, popularModels, this.CACHE_DURATION);
      
      return popularModels;
    } catch (error) {
      console.error('Popular Models Error:', error);
      throw new Error('Failed to retrieve popular models');
    }
  }

  /**
   * Update market data and invalidate related caches
   */
  async updateMarketData(data) {
    try {
      const { make, model, region } = data;
      
      // Invalidate related caches
      const trendsCacheKey = `${this.CACHE_KEY_PREFIX}trends:${make}:${model}`;
      const popularCacheKey = `${this.CACHE_KEY_PREFIX}popular:${region}`;
      
      await Promise.all([
        cacheUtils.del(trendsCacheKey),
        cacheUtils.del(popularCacheKey)
      ]);

      // Update database with new data
      await this.saveMarketData(data);

      return { success: true, message: 'Market data updated successfully' };
    } catch (error) {
      console.error('Market Data Update Error:', error);
      throw new Error('Failed to update market data');
    }
  }

  /**
   * Mock function to fetch market data
   * In real implementation, this would query a database or external service
   */
  async fetchMarketData(make, model) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      make,
      model,
      averagePrice: Math.floor(Math.random() * 40000) + 10000,
      demandLevel: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      priceHistory: Array.from({ length: 6 }, (_, i) => ({
        month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 7),
        averagePrice: Math.floor(Math.random() * 40000) + 10000
      })),
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Mock function to fetch popular models
   */
  async fetchPopularModels(region) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      region,
      models: [
        { make: 'Toyota', model: 'Corolla', popularityScore: 95 },
        { make: 'Honda', model: 'Civic', popularityScore: 90 },
        { make: 'Ford', model: 'Ranger', popularityScore: 85 },
        { make: 'Mazda', model: 'CX-5', popularityScore: 80 },
        { make: 'Hyundai', model: 'i30', popularityScore: 75 }
      ],
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Mock function to save market data
   */
  async saveMarketData(data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
}

module.exports = new MarketDataService();