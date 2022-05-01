'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {}
  }
  Room.init(
    {
      roomID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, //này nè DataTypes nhaaa
      },
      loaiPhong: DataTypes.STRING,
      lau: DataTypes.INTEGER,
      gia: DataTypes.INTEGER,
      soNguoiLon: DataTypes.INTEGER,
      soTreEm: DataTypes.INTEGER,
      soGiuong: DataTypes.INTEGER,
      moTa: DataTypes.STRING,
      imgs: DataTypes.STRING,
      trangThai: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room', //chú ý
      timestamps: false,
    }
  );
  return Room;
};
