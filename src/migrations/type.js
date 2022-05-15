'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Types',
      {
        typeID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },

        nameType: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
        },
        adult: {
          type: Sequelize.INTEGER,
        },
        children: {
          type: Sequelize.INTEGER,
        },
        bed: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING,
        },
        view: {
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
    await queryInterface.dropTable('Types');
  },
};
