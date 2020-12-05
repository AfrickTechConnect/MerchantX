export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('InvestorMerchants', {
    merchantId: {
      allowNull: false,
      type: Sequelize.UUID
    },
    investorId: {
      allowNull: false,
      type: Sequelize.UUID
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
  down: queryInterface => queryInterface.dropTable('InvestorMerchants')
};

