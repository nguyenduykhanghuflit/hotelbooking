'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      username: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataImages nhaaa
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User', //chú ý
      timestamps: true,
    }
  );
  return User;
};
