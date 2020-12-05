
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Wallets', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    balance: {
      type: Sequelize.DECIMAL(22, 2)
    },
    cummulativeGain: {
      type: Sequelize.DECIMAL(22, 2)
    },
    cummulativeLoss: {
      type: Sequelize.DECIMAL(22, 2)
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Wallets')
};
