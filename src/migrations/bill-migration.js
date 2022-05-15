'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Bills',
      {
        billID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        customerID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },
        roomID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },
        voucher_id: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },

        checkin: {
          type: Sequelize.DATE,
        },
        checkout: {
          type: Sequelize.DATE,
        },
        totalMoney: {
          type: Sequelize.INTEGER,
        },
        payment: {
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
    await queryInterface.dropTable('Bills');
  },
};
