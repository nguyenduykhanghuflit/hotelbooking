const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');

class ADMIN {
  getAllBookingList(checkin, checkout) {
    return new Promise(async (resolve, reject) => {
      // console.log(checkin);
      // console.log(checkout);
      try {
        let data = await db.Booking.findAll({
          where: {
            checkin: {
              [Op.gte]: checkin,
            },
            checkout: {
              [Op.lt]: checkout,
            },
          },
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.User,
              as: 'userData',
              plain: true,
              include: [
                {
                  model: db.Customer,
                  as: 'info',
                  plain: true,
                },
              ],
            },
            {
              model: db.Room,
              as: 'bookingData',
              plain: true,
              include: [{ model: db.Type, as: 'roomData', plain: true }],
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  getBookingByBookingID(bookingID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Booking.findByPk(bookingID, {
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.User,
              as: 'userData',
              plain: true,
              include: [
                {
                  model: db.Customer,
                  as: 'info',
                  plain: true,
                },
              ],
            },
            {
              model: db.Room,
              as: 'bookingData',
              plain: true,
              include: [{ model: db.Type, as: 'roomData', plain: true }],
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
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

  UpdateRoomReady(roomID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Booking.findAll({
          where: {
            roomID,
            [Op.or]: [{ status: 'đã đặt' }, { status: 'đã nhận phòng' }],
          },
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        if (data.length == 0) {
          let updateStatus = await this.UpdateStatusRoomByID(roomID, 'trống');
          resolve(updateStatus);
        }
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  UpdateBooking(bookingID, stt) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Booking.update(
          { status: stt },
          {
            where: {
              bookingID,
            },
          }
        );
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  AutoCancelBooking() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Booking.findAll({
          raw: true, //gộp lại k tách ra
          nest: true,
        });

        let now = new Date();
        now.setHours(0, 0, 0, 0);
        data.forEach(async (item) => {
          let checkin = new Date(item.checkin);
          if (checkin < now && item.status == 'đã đặt') {
            let updateBooking = await this.UpdateBooking(item.bookingID, 'hủy');
            // console.log(updateBooking);
            let updateRoom = await this.UpdateRoomReady(item.roomID);
            // console.log(updateRoom);
          }
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
  CreateBill(data) {
    return new Promise(async (resolve, reject) => {
      try {
        var id = nanoid(10);
        await db.Bill.create({
          billID: id,
          customerID: data.userData.info.customerID,
          roomID: data.roomID,
          voucher_id: 'đang cập nhật',
          checkin: data.checkin,
          checkout: data.checkout,
          totalMoney: data.total,
          payment: 'trực tiếp',
        });
        resolve({ message: 'success' });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new ADMIN();
