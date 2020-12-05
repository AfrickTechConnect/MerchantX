'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wallets', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wallets');
  }
};