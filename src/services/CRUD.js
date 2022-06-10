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
              where: {
                status: {
                  [Op.ne]: ['đang dọn'],
                },
              },
              attributes: ['roomID', 'status'],
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

  FindRoom(adult, children) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Type.findAll({
          attributes: { exclude: ['RoomRoomID'] },
          where: { adult: adult, children: children },
          include: [
            {
              model: db.Room,
              as: 'roomData',
              attributes: ['roomID', 'status'],
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

  getBookedRoomFromBooking(typeID, dayStart) {
    return new Promise(async (resolve, reject) => {
      let d = new Date().setHours(0, 0, 0, 0);
      try {
        let data = await db.Room.findAll({
          attributes: ['roomID'],
          where: {
            status: 'đã đặt',
            typeID: typeID,
          },
          include: [
            {
              model: db.Booking,
              where: {
                status: {
                  [Op.ne]: ['đang dọn'],
                },
              },
              as: 'bookingData',
              where: {
                [Op.or]: [
                  { checkin: { [Op.gte]: d } },
                  { checkout: { [Op.gte]: d } },
                ],
              },
              attributes: ['checkin', 'checkout'],
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

  CheckVoucherValid(voucherName) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Voucher.findOne({
          attributes: ['discount', 'voucher_id'],
          where: { name: voucherName, status: 'active' },
          raw: true,
        });
        if (data) resolve({ message: 'voucher valid', data });
        else resolve({ message: 'voucher invalid' });
      } catch (error) {
        reject(error);
      }
    });
  }

  CreateBooking(
    roomID,
    status,
    checkin,
    checkout,
    username,
    voucher_id,
    discount,
    total
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        var id = nanoid(10);
        await db.Booking.create({
          bookingID: id,
          roomID,
          status,
          checkin,
          checkout,
          username,
          voucher_id,
          discount,
          total,
        });
        resolve('Success');
      } catch (error) {
        reject('Create Fail');
      }
    });
  }

  UpdateStatusRoomByID(roomID, status) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Room.update(
          { status },
          {
            where: {
              roomID,
            },
          }
        );
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }
}

module.exports = new CRUD();
