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

  getAllBillList(checkin, checkout) {
    return new Promise(async (resolve, reject) => {
      // console.log(checkin);
      // console.log(checkout);
      try {
        let data = await db.Bill.findAll({
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
              model: db.Customer,
              as: 'customerData',
              plain: true,
            },
            {
              model: db.Room,
              as: 'billData',
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

  getBillByBookingID(bookingID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Bill.findOne({
          where: { bookingID },
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  getBillByBillID(billID) {
    return new Promise(async (resolve, reject) => {
      // console.log(checkin);
      // console.log(checkout);
      try {
        let data = await db.Bill.findByPk(billID, {
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.Customer,
              as: 'customerData',
              plain: true,
            },
            {
              model: db.Room,
              as: 'billData',
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

  UpdateAllRoom() {
    return new Promise(async (resolve, reject) => {
      try {
        let dataPayment = await db.Booking.findAll({
          where: {
            [Op.or]: [
              { status: 'hủy' },
              { status: 'đã trả phòng và thanh toán' },
            ],
          },
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        let listRoomID = [];
        dataPayment.forEach((item) => listRoomID.push(item.roomID));

        listRoomID.forEach(async (item) => {
          let dt = await db.Booking.findAll({
            where: {
              roomID: item,
              [Op.or]: [{ status: 'đã đặt' }, { status: 'đã nhận phòng' }],
            },
            raw: false, //gộp lại k tách ra
            nest: true,
          });
          if (dt.length == 0) {
            let updateStatus = await this.UpdateStatusRoomByID(item, 'trống');
            resolve(updateStatus);
          }
          resolve(true);
        });
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
          raw: true, //không gộp lại
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
          bookingID: data.bookingID,
          customerID: data.userData.info.customerID,
          roomID: data.roomID,
          voucher_id: data.voucher_id,
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

  GetVoucherByVoucherName(name) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Voucher.findOne({
          where: { name },
          raw: false, //gộp lại k tách ra
          plain: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  Statistical() {
    return new Promise(async (resolve, reject) => {
      try {
        let countRoom = await db.Room.findAll();
        let countUser = await db.User.findAll();
        let countBooking = await db.Booking.findAll();
        let countBill = await db.Bill.findAll();

        resolve({
          countRoom: countRoom.length,
          countUser: countUser.length,
          countBooking: countBooking.length,
          countBill: countBill.length,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  StatisticalWeek() {
    return new Promise(async (resolve, reject) => {
      try {
        // let d = new Date();
        // var day = d.getDay(),
        //   diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        // let firstday = new Date(d.setDate(diff));
        // firstday.setHours(0, 0, 0, 0);
        // let date = new Date();
        // var lastday = date.getDate() - (date.getDay() - 1) + 6;
        // lastday = new Date(date.setDate(lastday));
        // lastday.setHours(23, 59, 59);
        // lastday.setHours(23, 59, 59, 0);

        // let countBooking = await db.Booking.findAll({
        //   where: {
        //     [Op.and]: [
        //       {
        //         createdAt: {
        //           [Op.lte]: firstday,
        //         },
        //       },
        //       {
        //         createdAt: {
        //           [Op.lte]: lastday,
        //         },
        //       },
        //     ],
        //   },
        // });
        let countBill = await db.Bill.findAll();

        resolve(countBill);
      } catch (error) {
        reject(error);
      }
    });
  }

  GetAllRoom() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Room.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.Type,
              as: 'roomData',
              plain: true,
              include: [
                {
                  model: db.Image,
                  as: 'imgData',
                  plain: true,
                },
              ],
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  GetRoomByRoomID(roomID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Room.findByPk(roomID, {
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  CreateRoom(typeID, floor) {
    return new Promise(async (resolve, reject) => {
      try {
        var roomID = nanoid(10);
        let data = await db.Room.create({
          roomID,
          typeID,
          floor: parseInt(floor),
          status: 'trống',
        });
        resolve('succes');
      } catch (error) {
        reject('fail');
      }
    });
  }
  async UpdateRoom(roomID, floor, typeID) {
    await db.Room.update(
      { floor, typeID },
      {
        where: {
          roomID,
        },
      }
    );
  }
  GetAllType() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Type.findAll();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  GetAllAdmin() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Admin.findAll();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new ADMIN();
