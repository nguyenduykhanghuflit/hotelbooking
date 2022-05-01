const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');
class HomeController {
  mdw(req, res, next) {
    let a = 1;
    if (a == 1) next();
    else res.json('cút');
  }

  async data(req, res) {
    let data = await CRUD.getAllTestData();
    // res.render('home/home.ejs', { data: data });
    res.json(data);
  }

  async index(req, res) {
    let data = await CRUD.getAllTestData();
    res.render('client/home.ejs', { data: data, layout: false });
  }

  //hiển thị tất cả các phòng
  async rooms(req, res) {
    let data = await CRUD.getAllRoom();
    let listImg = [];
    data.forEach((room) => {
      let dt = [];
      let s = room.imgs.split(']');
      for (let i = 0; i < s.length - 1; i++) dt.push(s[i].slice(1));
      listImg.push(dt);
    });
    for (let i = 0; i < listImg.length; i++) {
      data[i].imgs = listImg[i];
    }
    res.render('client/rooms.ejs', { data, layout: false });
  }

  async filterRooms(req, res) {
    let soNguoiLon = req.query.soNguoiLon;
    let soTreEm = req.query.soTreEm;
    let title = req.query.val;
    soNguoiLon = parseInt(soNguoiLon);
    soTreEm = parseInt(soTreEm);

    if (typeof soNguoiLon != 'number' || typeof soTreEm != 'number')
      res.json({ message: 'data invalid' });
    else {
      let data = await CRUD.getRoomByCapacity(soNguoiLon, soTreEm);
      let listImg = [];
      data.forEach((room) => {
        let dt = [];
        let s = room.imgs.split(']');
        for (let i = 0; i < s.length - 1; i++) dt.push(s[i].slice(1));
        listImg.push(dt);
      });
      for (let i = 0; i < listImg.length; i++) {
        data[i].imgs = listImg[i];
      }
      data.title = title;
      return res.render('client/f.ejs', { data });
      // res.json(data);
    }
  }

  async detailRooms(req, res) {
    let idRoom = req.params.id;

    let data = await CRUD.getRoomByID(idRoom);
    let listImg = [];
    data.forEach((room) => {
      let dt = [];
      let s = room.imgs.split(']');
      for (let i = 0; i < s.length - 1; i++) dt.push(s[i].slice(1));
      listImg.push(dt);
    });
    for (let i = 0; i < listImg.length; i++) {
      data[i].imgs = listImg[i];
    }
    res.render('client/detail.ejs', { data });
    // res.send(data);
  }
}
module.exports = new HomeController();
