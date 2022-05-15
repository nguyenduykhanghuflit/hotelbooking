'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    static associate(models) {}
  }
  Voucher.init(
    {
      voucher_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataImages nhaaa
      },
      name: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      status: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      date_exprire: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Voucher', //chú ý
      timestamps: true,
    }
  );
  return Voucher;
};
