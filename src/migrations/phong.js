'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Rooms',
      {
        roomID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        loaiPhong: {
          type: Sequelize.STRING,
        },
        lau: {
          type: Sequelize.INTEGER,
        },
        gia: {
          type: Sequelize.INTEGER,
        },
        soNguoiLon: {
          type: Sequelize.INTEGER,
        },
        soTreEm: {
          type: Sequelize.INTEGER,
        },
        soGiuong: {
          type: Sequelize.INTEGER,
        },
        moTa: {
          type: Sequelize.STRING,
        },
        imgs: {
          type: Sequelize.STRING,
        },
        trangThai: {
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
    await queryInterface.dropTable('Rooms');
  },
};
