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
      res.json({ message: 'Phòng không hợp lệ' });
    } else {
      res.render('client/bill.ejs', { data, layout: false });
    }
  }

  //midleware kiểm tra
  async CheckBooking(req, res, next) {
    let dataBooking = req.body.data,
      token = dataBooking.token,
      typeID = dataBooking.typeID,
      listRoom = await CRUD.getRoomTypeById(typeID);

    //kiểm tra đầu vào
    if (!listRoom || !typeID || !token) {
      req.body.data.message = 'Data Invalid';
      next();
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
          next();
        }
      }
    } catch (err) {
      req.body.data.message = 'Token Invalid';
      next();
    }

    //check voucher
    if (!dataBooking.voucher) dataBooking.voucher = { discount: 0 };
    else {
      let check = await CRUD.CheckVoucherValid(dataBooking.voucher);
      if (check.message == 'voucher invalid') {
        req.body.data.message = check.message;
        next();
      } else {
        req.body.data.message = check.message;
        req.body.data.voucher = { ...check.data };
        next();
      }
    }

    let listDataRoom = listRoom.roomData,
      qty = dataBooking.amount,
      dem = 0,
      listRoomIDReady = [];

    listDataRoom.forEach((room) => {
      if (room.status == 'trống') {
        listRoomIDReady.push(room.roomID);
        dem++;
      }
    });
    if (dem >= parseInt(qty)) {
      req.body.data.message = 'Available';
      req.body.data.roomReady = listRoomIDReady;
      next();
    }

    let dayStart = dataBooking.checkin,
      dayEnd = dataBooking.checkout;
    let bookedRoom = await CRUD.getBookedRoomFromBooking(typeID, dayStart);

    let flag = false;
    bookedRoom.forEach((room) => {
      let listDateBooking = room.bookingData;
      for (let i = 0; i < listDateBooking.length; i++) {
        // if (
        //   dayStart > listDateBooking[i].checkout ||
        //   (dayStart < listDateBooking[i].checkin &&
        //     dayEnd < listDateBooking[i].checkin)
        // ) {
        //   flag = true;
        // } else {
        //   flag = false;
        //   break;
        // }
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
      next();
    } else {
      req.body.data.message = 'Unavailable';
      req.body.data.roomReady = null;
      next();
    }
  }

  //api kiểm tra
  async CheckDataBooking(req, res) {
    let mess = req.body.data.message;
    let ret = req.body.data.roomReady;
    let data = req.body.data;
    res.send({ mess, ret });
  }
  //api đặt phòng
  async CreateBooking(req, res) {
    let mess = req.body.data.message;
    let ret = req.body.data.roomReady;
    res.send(mess);
  }

  //lọc ra
  async FilterRooms(req, res) {
    let adult = req.body.data.adult;
    let children = req.body.data.adult;
    res.send('aaaa');
  }
}

module.exports = new RoomController();
