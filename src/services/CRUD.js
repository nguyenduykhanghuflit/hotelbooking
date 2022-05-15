const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');

class CRUD {
  /**--------------------------TEST DATA ----------------------------*/
  getAllTestData1() {
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
  getAllTestData() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.User.findAll();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  /**-------------------------------------------------------------*/

  //lấy tất cả loại phòng
  getAllRoomType() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Type.findAll({
          attributes: { exclude: ['RoomRoomID'] },
          // attributes: ['url'],
          include: [
            {
              model: db.Image,
              as: 'imgData',
              attributes: ['url'],
              plain: true,
            },
          ],

          raw: false, //gộp lại k tách ra
          nest: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  //lấy 1 loại phòng theo typeID
  getRoomTypeById(typeID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Type.findByPk(typeID, {
          attributes: { exclude: ['RoomRoomID'] },

          include: [
            {
              model: db.Room,
              as: 'roomData',
              attributes: ['roomID'],
              where: { status: 'chưa đặt' },
              plain: true,
            },
            {
              model: db.Image,
              as: 'imgData',
              attributes: ['url'],
              plain: true,
            },
          ],
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new CRUD();
