'use strict';
module.exports = (sequelize, DataTypes) => {
  const Investor = sequelize.define('Investor', {
    investmentLimit: DataTypes.DECIMAL(22, 2),
    govtId: DataTypes.STRING
  }, {});
  Investor.associate = function(models) {
    Investor.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Investor;
};