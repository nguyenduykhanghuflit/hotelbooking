const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');

class admissionsController {
  addstudent(req, res) {
    res.render('admissions/addstudent.ejs');
  }

  async admissions(req, res) {
    await CRUD.createNewStudent(req.body);
    res.render('admissions/addstudent.ejs');
  }
  async getStudentByGrade(req, res) {
    let x = req.body.datasend;
    x == undefined || x == 'Tất cả'
      ? res.send(await CRUD.getAllNewStudent())
      : res.send(await CRUD.getNewStudentByGrade(x));
  }

  async AllNewStudent(req, res) {
    let data = await CRUD.getAllNewStudent();
    res.render('admissions/admissions.ejs', { data: data });
  }
}
module.exports = new admissionsController();
