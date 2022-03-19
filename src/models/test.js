'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    static associate(models) {}
  }
  Test.init(
    {
      TestID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataTypes nhaaa
      },
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      Address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Test', //chú ý
      timestamps: false,
    }
  );
  return Test;
};
