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
      references: 'Book',
      referencesKey: 'id'
    },
    patron_id: {
      type: DataTypes.INTEGER,
      references: 'Patron',
      referencesKey: 'id'
    },
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_pn: DataTypes.DATE
  },
  {
    timestamps: false,
  });


  Loan.associate = function(models) {

  };
  return Loan;
};
