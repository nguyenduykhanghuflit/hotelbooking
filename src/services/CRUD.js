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

  // check phòng hợp lệ và có thể đặt:checkin, checkout, số lượng, typeID
  // lấy ra list phòng theo typeID
  //lặp ra cái list phòng này:vào bảng booking check[i]:nếu chưa có ai đặt thì đặt:set status=true xong break
  //nếu có người đặt rồi:
  //đc list checkin checkout
  //check qua list này nếu đầu vào nằm trong giữa thì stt=false if stt=true =>book
  // status:đã đặt
  // nếu có rồi

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
}

module.exports = new CRUD();
