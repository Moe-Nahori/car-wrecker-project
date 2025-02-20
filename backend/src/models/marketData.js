const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MarketData = sequelize.define('MarketData', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    metalPricePerKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    dateEffective: {
      type: DataTypes.DATE,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avgSalvagePrices: {
      type: DataTypes.JSONB,
      defaultValue: {},
      validate: {
        isValidFormat(value) {
          // Ensure the format matches our expected structure
          const requiredKeys = ['make', 'model', 'yearRange', 'price'];
          if (Array.isArray(value.prices)) {
            value.prices.forEach(price => {
              requiredKeys.forEach(key => {
                if (!(key in price)) {
                  throw new Error(`Missing required key: ${key}`);
                }
              });
            });
          }
        }
      }
    },
    marketTrends: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['dateEffective', 'region']
      }
    ]
  });

  return MarketData;
};