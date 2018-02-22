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
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Patron',
        key: 'id'
      }
    },
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_on: DataTypes.DATE
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
