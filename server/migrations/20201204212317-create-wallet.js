
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Wallets', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    investorId: {
      type: Sequelize.UUID,
      references: {
        model: 'Investors',
        key: 'id'
      }
    },
    balance: {
      type: Sequelize.DECIMAL(10, 2)
    },
    cummulativeGain: {
      type: Sequelize.DECIMAL(10, 2)
    },
    cummulativeLoss: {
      type: Sequelize.DECIMAL(10, 2)
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Wallets')
};
