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
  DataHome() {
    return new Promise(async (resolve, reject) => {
      try {
        let dataBill = await db.Bill.findAll();
        let dataBooking = await db.Booking.findAll();

        resolve({ dataBill, dataBooking });
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
  GetAllRoomType() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Type.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.Image,
              as: 'imgData',
              plain: true,
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  GetAllRoomTypeByTypeID(typeID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Type.findByPk(typeID, {
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.Image,
              as: 'imgData',
              plain: true,
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
  async UpdateRoomType(
    typeID,
    nameType,
    price,
    adult,
    children,
    bed,
    description,
    view
  ) {
    await db.Type.update(
      {
        nameType,
        price,
        adult: parseInt(adult),
        children: parseInt(children),
        bed,
        description,
        view,
      },
      {
        where: {
          typeID,
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

  CheckUserValid(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.User.findAll({
          where: { username, role: 'admin' },
        });
        // if (data.length > 0) resolve(false);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  CreateAccountAdmin(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.User.create({
          username,
          password,
          role: 'admin',
        });
        resolve('Success');
      } catch (error) {
        reject('Fail');
      }
    });
  }
  CreateInfoAdmin(username, fullName, email, phone, gender) {
    return new Promise(async (resolve, reject) => {
      try {
        var adminID = nanoid(10);
        let data = await db.Admin.create({
          adminID,
          username,
          fullName,
          email,
          phone,
          gender,
        });
        resolve('Success');
      } catch (error) {
        reject('Fail');
      }
    });
  }
  getAdminById(adminID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Admin.findByPk(adminID, {
          raw: false, //gộp lại k tách ra
          plain: true,
          include: [
            {
              model: db.User,
              as: 'acc',
              raw: false, //gộp lại k tách ra
              plain: true,
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  async UpdateAdmin(
    adminID,
    username,
    fullName,
    email,
    password,
    phone,
    gender
  ) {
    await db.Admin.update(
      { fullName, email, phone, gender },
      {
        where: {
          adminID,
        },
      }
    );
    await db.User.update(
      { password },
      {
        where: {
          username,
        },
      }
    );
  }
}

module.exports = new ADMIN();
