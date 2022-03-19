'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Teachers',
      {
        teacherID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        specialize: {
          type: Sequelize.STRING,
        },
        surName: {
          type: Sequelize.STRING,
        },
        middleName: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        dateOfBirth: {
          type: Sequelize.DATE,
        },
        gender: {
          type: Sequelize.BOOLEAN,
        },
        address: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        domicile: {
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
    await queryInterface.dropTable('Teachers');
  },
};
