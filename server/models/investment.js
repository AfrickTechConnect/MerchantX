import uuid from 'uuid/v4';

export default (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    amount: DataTypes.DECIMAL(10, 2),
    date: DataTypes.STRING,
    interestRate: DataTypes.INTEGER,
    investmentType: DataTypes.STRING
  }, {});
  Investment.associate = (models) => {
    Investment.belongsTo(models.Investor, {
      foreignKey: 'investorId'
    });
    Investment.belongsTo(models.Merchant, {
      foreignKey: 'merchantId'
    });
  };

  // eslint-disable-next-line no-return-assign
  Investment.beforeCreate(investment => investment.id = uuid());
  return Investment;
};
