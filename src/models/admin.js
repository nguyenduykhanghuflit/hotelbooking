'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {}
  }
  Admin.init(
    {
      adminID: {
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
      modelName: 'Admin', //chú ý
      timestamps: true,
    }
  );
  return Admin;
};
