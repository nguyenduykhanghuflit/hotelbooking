'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Type, { foreignKey: 'typeID', as: 'roomData' });
    }
  }
  Room.init(
    {
      roomID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataTypes nhaaa
      },
      typeID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.STRING,
      },
      floor: DataTypes.INTEGER,
      status: DataTypes.STRING,
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Room', //chú ý
      timestamps: false,
    }
  );

  return Room;
};
