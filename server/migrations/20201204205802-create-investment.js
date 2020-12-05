
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Investments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2)
    },
    date: {
      type: Sequelize.STRING
    },
    investorId: {
      type: Sequelize.UUID,
      references: {
        model: 'Investors',
        key: 'id'
      }
    },
    merchantId: {
      type: Sequelize.UUID,
      references: {
        model: 'Merchants',
        key: 'id'
      }
    },
    interestRate: {
      type: Sequelize.INTEGER
    },
    investmentType: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Investments')
};
