'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.User, {
        foreignKey: 'username',
        as: 'info',
      });
      Customer.hasMany(models.Bill, {
        foreignKey: 'customerID',
        as: 'customerData',
      });
    }
  }
  Customer.init(
    {
      customerID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataImages nhaaa
      },
      username: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Customer', //chú ý
      timestamps: true,
    }
  );
  return Customer;
};
