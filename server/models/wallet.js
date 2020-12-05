'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    balance: DataTypes.DECIMAL(22, 2),
    cummulativeGain: DataTypes.DECIMAL(22, 2),
    cummulativeLoss: DataTypes.DECIMAL(22, 2),
  }, {});
  Wallet.associate = function(models) {
    // associations can be defined here
    
  };
  return Wallet;
};