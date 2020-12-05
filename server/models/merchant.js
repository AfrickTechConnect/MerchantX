'use strict';
module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    'Merchant', {
      cacDocumentUrl: {
        type: DataTypes.STRING,
      },
      creditScore: {
        type: DataTypes.INTEGER,
      },
      attachementPitch: {
        type: DataTypes.STRING,
      }
  }, {});
  Merchant.associate = function(models) {
    Merchant.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Merchant;
};