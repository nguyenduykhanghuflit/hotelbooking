const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');

// const { nanoid } = require('nanoid');
const { customAlphabet } = require('nanoid');

class RoomController {
  //hiển thị tất cả các phòng
  async Rooms(req, res) {
    let data = await CRUD.getAllRoomType();
    res.render('client/rooms.ejs', { data, layout: false });
    // res.send(data);
  }

  //chi tiết
  async DetailRooms(req, res) {
    let typeID = req.params.typeID;
    //find Type by ID
    let data = await CRUD.getRoomTypeById(typeID);
    !data
      ? res.json({ message: 'Phòng không hợp lệ' })
      : res.render('client/detail.ejs', { data, layout: false });
    // res.render('client/detail.ejs', { data, layout: false });
  }

  //
  async Booking(req, res) {
    let typeID = req.params.typeID;
    let data = await CRUD.getRoomTypeById(typeID);
    if (!data) {
      res.json({ message: 'Phòng không hợp lệ' });
    } else {
      if (data.roomData.length <= 0) {
        res.json({ message: 'Hết phòng' });
      } else {
        // const nanoid = customAlphabet('1234567890', 6);
        res.render('client/bill.ejs', { data, layout: false });
        // res.json(data);
      }
    }
  }

  //lọc ra
  async FilterRooms(req, res) {
    let adult = req.body.data.adult;
    let children = req.body.data.adult;
    res.send('aaaa');
  }
}
module.exports = new RoomController();
