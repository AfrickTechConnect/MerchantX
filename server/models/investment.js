import uuid from 'uuid/v4';

export default (sequelize, DataTypes) => {
  const Investment = sequelize.define('Investment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    amount: DataTypes.DECIMAL(22, 2),
    date: DataTypes.DATE,
    interestRate: DataTypes.INTEGER,
    investmentType: DataTypes.STRING
  }, {});
  Investment.associate = (models) => {
    Investment.belongsToMany(models.Investor, {
      foreignKey: 'investorId',
      otherKey: 'merchantId',
      through: 'InvestorMerchants',
      as: 'merchants',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  // eslint-disable-next-line no-return-assign
  Investment.beforeCreate(investment => investment.id = uuid());
  return Investment;
};
