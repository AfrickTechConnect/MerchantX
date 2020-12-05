/* eslint-disable no-return-assign */
import uuid from 'uuid/v4';

module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    'Merchant', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      name: {
        type: DataTypes.STRING,
      },
      cacDocumentUrl: {
        type: DataTypes.STRING,
      },
      creditScore: {
        type: DataTypes.INTEGER,
      },
      attachementPitch: {
        type: DataTypes.STRING,
      }
    }, {}
  );
  Merchant.associate = (models) => {
    Merchant.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Merchant.hasMany(models.Investment, {
      foreignKey: 'merchantId'
    });
    Merchant.belongsToMany(models.Investor, {
      foreignKey: 'merchantId',
      otherKey: 'investorId',
      through: 'InvestorMerchants',
      as: 'investors',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  Merchant.beforeCreate(merchant => merchant.id = uuid());
  return Merchant;
};
