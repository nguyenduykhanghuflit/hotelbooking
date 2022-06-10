'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    static associate(models) {
      Bill.belongsTo(models.Room, {
        foreignKey: 'roomID',
        as: 'billData',
      });
      Bill.belongsTo(models.Customer, {
        foreignKey: 'customerID',
        as: 'customerData',
      });
    }
  }
  Bill.init(
    {
      billID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataTypes nhaaa
      },
      bookingID: DataTypes.STRING,
      customerID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      roomID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      voucher_id: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      totalMoney: DataTypes.STRING,
      payment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Bill', //chú ý
    }
  );
  return Bill;
};
