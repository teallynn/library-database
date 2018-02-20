'use strict';

module.exports = (sequelize, DataTypes) => {
  var Patron = sequelize.define('Patron', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    library_id: DataTypes.STRING,
    zip_code: DataTypes.INTEGER
  }, {
    timestamps: false,
  });
  Patron.associate = function(models) {
    Patron.hasMany(models.Loan);
  };
  return Patron;
};
