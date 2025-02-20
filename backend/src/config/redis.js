const Redis = require('ioredis');
const logger = require('./logger');

// Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
};

// Create Redis client
const redisClient = new Redis(redisConfig);

// Redis event handlers
redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('reconnecting', () => {
  logger.warn('Redis client reconnecting');
});

// Cache helper functions
const cacheUtils = {
  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds
   */
  async set(key, value, ttl = 3600) {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await redisClient.setex(key, ttl, serializedValue);
      } else {
        await redisClient.set(key, serializedValue);
      }
    } catch (error) {
      logger.error('Redis Set Error:', error);
      throw error;
    }
  },

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {Promise<any>} Cached value
   */
  async get(key) {
    try {
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Redis Get Error:', error);
      throw error;
    }
  },

  /**
   * Delete value from cache
   * @param {string} key - Cache key
   */
  async del(key) {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error('Redis Delete Error:', error);
      throw error;
    }
  },

  /**
   * Set value in hash
   * @param {string} hash - Hash name
   * @param {string} field - Field name
   * @param {any} value - Value to store
   */
  async hset(hash, field, value) {
    try {
      const serializedValue = JSON.stringify(value);
      await redisClient.hset(hash, field, serializedValue);
    } catch (error) {
      logger.error('Redis HSet Error:', error);
      throw error;
    }
  },

  /**
   * Get value from hash
   * @param {string} hash - Hash name
   * @param {string} field - Field name
   * @returns {Promise<any>} Cached value
   */
  async hget(hash, field) {
    try {
      const value = await redisClient.hget(hash, field);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Redis HGet Error:', error);
      throw error;
    }
  },

  /**
   * Set multiple hash fields
   * @param {string} hash - Hash name
   * @param {Object} data - Field-value pairs
   */
  async hmset(hash, data) {
    try {
      const serializedData = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value);
        return acc;
      }, {});
      await redisClient.hmset(hash, serializedData);
    } catch (error) {
      logger.error('Redis HMSet Error:', error);
      throw error;
    }
  }
};

module.exports = {
  redisClient,
  cacheUtils
};