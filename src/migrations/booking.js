'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Booking',
      {
        bookingID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        roomID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },

        status: {
          type: Sequelize.STRING,
        },
        checkin: {
          type: Sequelize.DATE,
        },
        checkout: {
          type: Sequelize.DATE,
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
    await queryInterface.dropTable('Booking');
  },
};
