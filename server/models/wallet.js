import uuid from 'uuid/v4';

export default (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    balance: DataTypes.DECIMAL(22, 2),
    cummulativeGain: DataTypes.DECIMAL(22, 2),
    cummulativeLoss: DataTypes.DECIMAL(22, 2),
  }, {});
  Wallet.associate =  (models) => {};

  // eslint-disable-next-line no-return-assign
  Wallet.beforeCreate(wallet => wallet.id = uuid());
  return Wallet;
};
