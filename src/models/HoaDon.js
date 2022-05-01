'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {}
  }
  Bill.init(
    {
      billID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataTypes nhaaa
      },
      khachHangID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      roomID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      voucherID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      ngayDen: DataTypes.DATE,
      ngayDi: DataTypes.DATE,
      tongSoTien: DataTypes.INTEGER,
      ngayTaoHoaDon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Bill', //chú ý
      timestamps: false,
    }
  );
  return Bill;
};
