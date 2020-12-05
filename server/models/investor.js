import uuid from 'uuid/v4';

export default (sequelize, DataTypes) => {
  const Investor = sequelize.define('Investor', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    investmentLimit: DataTypes.DECIMAL(22, 2),
    govtId: DataTypes.STRING
  }, {});

  Investor.associate = (models) => {
    Investor.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Investor.hasOne(models.Wallet, {
      foreignKey: 'investorId'
    });
    Investor.belongsToMany(models.Merchant, {
      foreignKey: 'investorId',
      otherKey: 'merchantId',
      through: 'InvestorMerchants',
      as: 'merchants',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  // eslint-disable-next-line no-return-assign
  Investor.beforeCreate(investor => investor.id = uuid());
  return Investor;
};
