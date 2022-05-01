const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');

class CRUD {
  getAllTestData() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Test.findAll({
          raw: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getRoomByID(roomID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Room.findAll({
          raw: true,
          where: { trangThai: 0, roomID },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllRoom() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Room.findAll({
          raw: true,
          where: { trangThai: 0 },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  getRoomByCapacity(soNguoiLon, soTreEm) {
    if (soNguoiLon == 3) {
      return new Promise(async (resolve, reject) => {
        try {
          let data = await db.Room.findAll({
            raw: true,
            where: { trangThai: 0, soNguoiLon: 3, soTreEm },
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    } else if (soNguoiLon >= 5) {
      return new Promise(async (resolve, reject) => {
        try {
          let data = await db.Room.findAll({
            raw: true,
            where: { trangThai: 0, soNguoiLon: { [Op.gte]: 5 }, soTreEm },
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      return new Promise(async (resolve, reject) => {
        try {
          let data = await db.Room.findAll({
            raw: true,
            where: { trangThai: 0, soNguoiLon, soTreEm },
          });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    }
  }
}

module.exports = new CRUD();
