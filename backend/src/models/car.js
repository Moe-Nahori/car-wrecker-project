const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    vin: {
      type: DataTypes.STRING(17),
      allowNull: true,
      validate: {
        len: [17, 17]
      }
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: new Date().getFullYear() + 1
      }
    },
    condition: {
      type: DataTypes.ENUM(
        'Non-Running',
        'Running with Issues',
        'Good Running',
        'Damaged',
        'Salvage'
      ),
      allowNull: false
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      validate: {
        hasRequiredFields(value) {
          if (!value.latitude || !value.longitude || !value.address) {
            throw new Error('Location must include latitude, longitude, and address');
          }
        }
      }
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    additionalDetails: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  }, {
    timestamps: true,
    paranoid: true // Soft deletes
  });

  return Car;
};