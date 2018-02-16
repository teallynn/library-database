'use strict';


module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: DataTypes.DATE,
    return_by: DataTypes.DATE,
    returned_pn: DataTypes.DATE
  }, {
    timestamps: false,
  });
  Loan.associate = function(models) {
    // associations can be defined here
  };
  return Loan;
};
