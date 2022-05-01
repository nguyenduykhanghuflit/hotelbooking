'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Bills',
      {
        roomID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        khachHangID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },
        roomID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },
        voucherID: {
          allowNull: false,
          foreignKey: true,
          type: Sequelize.STRING,
        },

        ngayDen: {
          type: Sequelize.DATE,
        },
        ngayDi: {
          type: Sequelize.DATE,
        },
        tongSoTien: {
          type: Sequelize.INTEGER,
        },
        ngayTaoHoaDon: {
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
