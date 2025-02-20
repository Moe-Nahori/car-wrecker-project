const { cacheUtils } = require('../config/redis');

/**
 * Cache middleware for routes
 * @param {number} duration - Cache duration in seconds
 * @returns {Function} Express middleware
 */
const cacheMiddleware = (duration = 3600) => {
  return async (req, res, next) => {
    try {
      // Skip caching for non-GET requests
      if (req.method !== 'GET') {
        return next();
      }

      // Generate cache key from URL and query params
      const cacheKey = `route:${req.originalUrl}`;
      
      // Try to get from cache
      const cachedResponse = await cacheUtils.get(cacheKey);
      
      if (cachedResponse) {
        return res.json(cachedResponse);
      }

      // Store original send function
      const originalSend = res.json;

      // Override send function to cache response
      res.json = function(body) {
        // Cache the response
        cacheUtils.set(cacheKey, body, duration)
          .catch(err => console.error('Cache Set Error:', err));
        
        // Call original send
        return originalSend.call(this, body);
      };

      next();
    } catch (error) {
      // If cache fails, continue without caching
      console.error('Cache Middleware Error:', error);
      next();
    }
  };
};

module.exports = cacheMiddleware;