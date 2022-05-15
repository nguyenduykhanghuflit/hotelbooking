'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users',
      {
        username: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      { define: { freezeTableName: true } }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
