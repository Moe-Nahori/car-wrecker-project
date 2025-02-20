const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false // Set to console.log to see SQL queries
});

// Import models
const User = require('./user')(sequelize);
const Car = require('./car')(sequelize);
const Quote = require('./quote')(sequelize);
const MarketData = require('./marketData')(sequelize);

// Define relationships
User.hasMany(Car);
Car.belongsTo(User);

Car.hasMany(Quote);
Quote.belongsTo(Car);

// Export models and Sequelize instance
module.exports = {
  sequelize,
  User,
  Car,
  Quote,
  MarketData
};