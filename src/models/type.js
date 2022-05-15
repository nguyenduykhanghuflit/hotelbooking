'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      // Type.hasMany(models.Room);
      Type.hasMany(models.Image, { foreignKey: 'typeID', as: 'imgData' });
      Type.hasMany(models.Room, { foreignKey: 'typeID', as: 'roomData' });
    }
  }
  Type.init(
    {
      typeID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataTypes nhaaa
      },
      nameType: DataTypes.STRING,
      price: DataTypes.STRING,
      adult: DataTypes.INTEGER,
      children: DataTypes.INTEGER,
      bed: DataTypes.STRING,
      description: DataTypes.STRING,
      view: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Type', //chú ý
      timestamps: false,
    }
  );
  return Type;
};
