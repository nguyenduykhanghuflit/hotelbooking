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
  async EditManagerController(req, res) {
    let adminID = req.params.adminID;
    let data = await ADMIN.getAdminById(adminID);
    // res.send(data);
    res.render('admin/edit-admin.ejs', { data });
  }
  //Xử lý
  async CreateManager(req, res) {
    let data = req.body.data;
    let username = data.username;
    let password = data.password;
    let fullName = data.fullName;
    let gender = data.gender;
    let email = data.email;
    let phone = data.phone;

    if (!username || !password || !fullName || !gender || !email || !phone)
      res.send('Data Invalid');
    else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      res.send('Email Invalid');
    } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)) {
      res.send('Phone Invalid');
    } else {
      let checkUsername = await ADMIN.CheckUserValid(username);
      let l = checkUsername.length;
      if (l > 0) {
        res.send('User Invalid');
      } else {
        let create = await ADMIN.CreateAccountAdmin(username, password);
        if (create != 'Success') res.send('Fail');
        else {
          let info = await ADMIN.CreateInfoAdmin(
            username,
            fullName,
            email,
            phone,
            gender
          );
          if (info != 'Success') res.send('Fail');
        }

        res.send('Success');
      }
    }
  }
  //Xử lý
  async EditManager(req, res) {
    let data = req.body;
    let ud = await ADMIN.UpdateAdmin(
      data.adminID,
      data.username,
      data.fullName,
      data.email,
      data.password,
      data.phone,
      data.gender
    );
    res.redirect('/admin/manager');
  }
}
module.exports = new AdminSystemController();
