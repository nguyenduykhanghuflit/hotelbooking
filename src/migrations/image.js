'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Images',
      {
        imageID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        typeID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },
        url: {
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
    await queryInterface.dropTable('Images');
  },
};
