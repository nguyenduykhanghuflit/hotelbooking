'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Type, { foreignKey: 'typeID', as: 'imgData' });
    }
  }
  Image.init(
    {
      imageID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataImages nhaaa
      },
      typeID: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Image', //chú ý
      timestamps: false,
    }
  );
  return Image;
};
