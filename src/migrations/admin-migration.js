'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Admins',
      {
        adminID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        username: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },
        fullName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        gender: {
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
    await queryInterface.dropTable('Admins');
  },
};
