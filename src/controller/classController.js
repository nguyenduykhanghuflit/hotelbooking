const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');

class classController {
  //===========Xem lớp===============
  async ShowClass(req, res) {
    let data = await CRUD.getAllClass();
    res.render('class/class.ejs', { data: data });
  }

  async ShowClassByGrade(req, res) {
    let x = req.body.grade;
    let classID = 'CL' + x;

    x == undefined || x == 'Tất cả'
      ? res.send(await CRUD.getAllClass())
      : res.send(await CRUD.getClass(classID));
  }
  //=============Xem chi tiết============
  async ClassDetail(req, res) {
    let classID = req.params.classID;
    let studentInfo = await CRUD.getStudentByClassID(classID);
    let classInfo = await CRUD.getClassByClassID(classID);
    let data = { studentInfo, classInfo };

    res.render('class/class-detail.ejs', { data });
  }

  //==========Phân lớp=============
  async ShowClassList(req, res) {
    let x = req.query.GN;
    if (x == undefined || x == 'Tất cả' || x == '--Chọn khối--') {
      let data = await CRUD.getAllNewStudent();
      res.render('class/class-division.ejs', { data: data });
    } else {
      let data2 = await CRUD.getNewStudentByGrade(x);
      res.render('class/class-division.ejs', { data: data2 });
    }
  }
  async ClassDivision(req, res) {
    let dt = req.body.CL;
    let studentID = dt.slice(4).trim();
    let classID = ('CL' + dt.slice(0, 1) + dt.slice(2, 3)).trim();
    let ret = await CRUD.updateNumberOfClass(classID);
    let data = await CRUD.classDiv(classID, studentID);
    console.log(data);
    console.log(ret);
    res.redirect('class-division');
  }
}
module.exports = new classController();
