const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Quote = sequelize.define('Quote', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    scrapValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    partsValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    totalValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'accepted',
        'rejected',
        'expired'
      ),
      defaultValue: 'pending'
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false
    },
    priceBreakdown: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (quote) => {
        // Set quote expiration to 7 days from creation
        quote.validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      }
    }
  });

  return Quote;
};