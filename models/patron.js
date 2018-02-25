'use strict';

module.exports = (sequelize, DataTypes) => {
  var Patron = sequelize.define('Patron', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name is required.'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name is required.'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name is required.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name is required.'
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Library ID is required.'
        }
      }
    },
    zip_code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name is required.'
        }
      }
    }
  }, {
    timestamps: false,
    underscored: true
  });
  Patron.associate = function(models) {
    Patron.hasMany(models.Loan, { foreignKey: 'patron_id' });
  };
  return Patron;
};
