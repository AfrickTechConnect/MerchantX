'use strict';
module.exports = (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    amount: DataTypes.DECIMAL(22, 2),
    date: DataTypes.DATE,
    interestRate: DataTypes.INTEGER,
    investmentType: DataTypes.STRING
  }, {});
  Investment.associate = function(models) {
    
  };
  return Investment;
};