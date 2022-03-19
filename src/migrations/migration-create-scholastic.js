'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Scholastics',
      {
        scholasticID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },

        year: {
          type: Sequelize.STRING,
        },
        semester1: {
          type: Sequelize.STRING,
        },
        semester2: {
          type: Sequelize.STRING,
        },
        startDay: {
          type: Sequelize.STRING,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { define: { freezeTableName: true } }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scholastics');
  },
};
