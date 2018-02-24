'use strict';
var Book = require('../models/book.js');
var Patron = require('../models/patron.js');


module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Book',
        key: 'id'
      },
      validate: {
        notEmpty: {
          msg: 'Book ID is required.'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Patron',
        key: 'id'
      },
      validate: {
        notEmpty: {
          msg: 'Patron ID is required.'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Loaned On Date is required.'
        },
        isDate: {
          msg: 'Loaned on  Date must be a valid date.'
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Return by Date is required.'
        },
        isDate: {
          msg: 'Return by Date must be a valid date.'
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Returned on Date is required.'
        },
        isDate: {
          msg: 'Returned on Date must be a valid date.'
        }
      }
    }
  },
  {
    timestamps: false,
    underscored: true
  });


  Loan.associate = function(models) {
    Loan.belongsTo(models.Book, { foreignKey: 'book_id' });
    Loan.belongsTo(models.Patron, { foreignKey: 'patron_id' });
  };
  return Loan;
};
