const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminSystemController {
  //[VIEW]
  async Room(req, res) {
    let data = await ADMIN.GetAllRoom();
    // res.send(data);
    res.render('admin/room.ejs', { data });
  }
  //[VIEW]
  async CreateRoomController(req, res) {
    let data = await ADMIN.GetAllType();
    // res.send(data);
    res.render('admin/create-room.ejs', { data });
  }
  //[VIEW]
  async EditRoomController(req, res) {
    let roomID = req.params.roomID;
    let data = await ADMIN.GetAllType();
    // res.send();
    res.render('admin/edit-room.ejs', { data, roomID });
  }
  //Xử lý
  async CreateRoom(req, res) {
    let typeID = req.body.typeID;
    let amount = parseInt(req.body.amount);
    let floor = req.body.floor;
    for (let i = 0; i < amount; i++) {
      let create = await ADMIN.CreateRoom(typeID, parseInt(floor));
      console.log(create);
    }
    return res.redirect('/admin/room');
  }
  //Xử lý
  async EditRoom(req, res) {
    let roomID = req.body.roomID;
    let typeID = req.body.typeID;
    let floor = req.body.floor;

    let data = await ADMIN.UpdateRoom(roomID, floor, typeID);
    res.redirect('/admin/room');
  }
  //[VIEW]
  async RoomType(req, res) {
    res.send('loại phòng');
    // res.render('admin/home.ejs', { data: statistical });
  }
  //[VIEW]
  async CreateRoomTypeController(req, res) {
    res.render('admin/home.ejs', { data: statistical });
  }
  //[VIEW]
  async EditRoomTypeController(req, res) {
    res.render('admin/home.ejs', { data: statistical });
  }
  //Xử lý
  async CreateRoomType(req, res) {
    res.render('admin/home.ejs', { data: statistical });
  }
  //Xử lý
  async EditRoomType(req, res) {
    res.render('admin/home.ejs', { data: statistical });
  }
  //[VIEW]
  async Manager(req, res) {
    let data = await ADMIN.GetAllAdmin();
    res.render('admin/admin.ejs', { data: data });
  }
  //[VIEW]
  async CreateManagerController(req, res) {
    res.render('admin/add-admin.ejs');
  }

  //[VIEW]
  async EditManagerController(req, res) {}
  //Xử lý
  async CreateManager(req, res) {}
  //Xử lý
  async EditManager(req, res) {}
}
module.exports = new AdminSystemController();
