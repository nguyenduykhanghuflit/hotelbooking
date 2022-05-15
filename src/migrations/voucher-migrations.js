'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Vouchers',
      {
        voucher_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        discount: {
          type: Sequelize.INTEGER,
        },
        status: {
          type: Sequelize.STRING,
        },
        quantity: {
          type: Sequelize.INTEGER,
        },
        date_exprire: {
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
    await queryInterface.dropTable('Vouchers');
  },
};
