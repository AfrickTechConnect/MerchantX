"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avatarUrl: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      type: {
        type: Sequelize.TEXT
      },
      firstname: {
        type: Sequelize.STRING
      },
      followingsCount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      followersCount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
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
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};