const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');
const USER = require('../services/USER');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./key/pkcs8.key');
const publicKey = fs.readFileSync('./key/publickey.crt');
var moment = require('moment');
const axios = require('axios').default;

// const { nanoid } = require('nanoid');
const { customAlphabet } = require('nanoid');

class RoomController {
  //hiển thị tất cả các phòng
  async Rooms(req, res) {
    let data = await CRUD.getAllRoomType();
    res.render('client/rooms.ejs', { data, layout: false });
    // res.send(data);
  }

  //chi tiết [sửa lại bảng Room-->Sai]
  // async DetailRooms(req, res) {
  //   let typeID = req.params.typeID;
  //   //find Type by ID
  //   let data = await CRUD.getRoomTypeById(typeID);
  //   !data
  //     ? res.json({ message: 'Phòng không hợp lệ' })
  //     : res.render('client/detail.ejs', { data, layout: false });
  //   // res.render('client/detail.ejs', { data, layout: false });
  // }

  //

  async Booking(req, res) {
    let typeID = req.params.typeID;
    let data = await CRUD.getRoomTypeById(typeID);
    if (!data) {
      return res.json({ message: 'Phòng không hợp lệ' });
    } else {
      return res.render('client/bill.ejs', { data, layout: false });
    }
  }

  //midleware kiểm tra
  async CheckBooking(req, res, next) {
    let dataBooking = req.body.data,
      token = dataBooking.token,
      typeID = dataBooking.typeID,
      listRoom = await CRUD.getRoomTypeById(typeID);

    //kiểm tra đầu vào
    if (!listRoom || !typeID || !token || !dataBooking) {
      req.body.data.message = 'Data Invalid';
      return next();
    }

    //Kiểm tra thông tin người dùng có đúng hay không
    try {
      let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
      if (deccoded) {
        let username = deccoded.username;
        let role = deccoded.role;
        let info;
        if (role == 'admin') info = await USER.getInfoAdmin(username);
        else info = await USER.getInfoUser(username);
        if (
          info.fullName != dataBooking.fullName ||
          info.phone != dataBooking.phone ||
          info.email != dataBooking.email
        ) {
          req.body.data.message = 'User Invalid';
          return next();
        }
        req.body.data.username = username;
      }
    } catch (err) {
      req.body.data.message = 'Token Invalid';
      return next();
    }

    // check voucher
    if (!dataBooking.voucher)
      req.body.data.voucher = {
        voucher_id: 'Không có',
        voucherName: 'Không có',
        discount: 0,
      };
    else {
      let check = await CRUD.CheckVoucherValid(dataBooking.voucher);
      if (check.message == 'voucher invalid') {
        req.body.data.message = check.message;
        req.body.data.voucher = false;
        return next();
      } else {
        let voucherName = dataBooking.voucher;
        req.body.data.voucher = {
          ...check.data,
          voucherName,
        };
      }
    }

    //kiểm tra còn phòng hay không
    let listDataRoom = listRoom.roomData,
      qty = parseInt(dataBooking.amount),
      dem = 0,
      listRoomIDReady = [];

    //đếm xem có bao nhiêu phòng còn trống
    listDataRoom.forEach((room) => {
      if (room.status == 'trống') {
        listRoomIDReady.push(room.roomID);
        dem++;
      }
    });

    if (dem >= parseInt(qty)) {
      req.body.data.message = 'Available';
      req.body.data.roomReady = listRoomIDReady;
      return next();
    }

    let dayStart = dataBooking.checkin,
      dayEnd = dataBooking.checkout;
    let bookedRoom = await CRUD.getBookedRoomFromBooking(typeID, dayStart);

    let flag = false;
    bookedRoom.forEach((room) => {
      let listDateBooking = room.bookingData;
      for (let i = 0; i < listDateBooking.length; i++) {
        if (
          dayStart == listDateBooking[i].checkin ||
          dayStart == listDateBooking[i].checkout ||
          dayEnd == listDateBooking[i].checkin ||
          dayEnd == listDateBooking[i].checkout
        ) {
          flag = false;
          break;
        } else flag = true;
      }
      if (flag) {
        listRoomIDReady.push(room.roomID);
        dem++;
      }
    });

    if (dem >= parseInt(qty)) {
      req.body.data.message = 'Available';
      req.body.data.roomReady = listRoomIDReady;
      return next();
    } else {
      req.body.data.message = 'Unavailable';
      req.body.data.roomReady = null;
      return next();
    }
  }

  //api kiểm tra
  async CheckDataBooking(req, res) {
    let data = req.body.data;

    return res.send(data);
  }
  //api đặt phòng
  async CreateBooking(req, res) {
    let data = req.body.data;
    // res.send(data);
    let mess = data.message;
    if (mess != 'Available') return res.send('server error');
    else {
      let roomReady = data.roomReady;
      let amount = parseInt(data.amount);
      // console.log(amount);
      for (let i = 0; i < amount; i++) {
        let booking = await CRUD.CreateBooking(
          roomReady[i],
          'đã đặt',
          data.checkin,
          data.checkout,
          data.username,
          data.voucher.voucher_id,
          data.voucher.discount,
          data.totalMoney
        );

        let udr = await CRUD.UpdateStatusRoomByID(roomReady[i], 'đã đặt');
      }
    }
    return res.send('Success');
  }

  //lọc ra
  async FilterRooms(req, res) {
    let adult = req.body.data.adult,
      children = req.body.data.children,
      checkin = req.body.checkin,
      checkout = req.body.checkout,
      room = req.body.room;
    let response = await CRUD.FindRoom(adult, children);
    res.send(response);
  }
}

module.exports = new RoomController();
