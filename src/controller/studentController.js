const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');

class studentController {
  Student(req, res) {
    res.render('student/student.ejs');
  }
  async StudentDeatail(req, res) {
    let data = req.params.studentID;
    let student = await CRUD.getStudentByStudentID(data);
    data = student[0];
    res.render('student/profile.ejs', { data: data });
  }
  async GetStudent(req, res) {
    let keyword = req.body.keyword;
    let students = await CRUD.getAllStudent();
    let data = [];

    for (let teacher of students) {
      if (teacher.fullName.toLowerCase().includes(keyword.toLowerCase())) {
        data.push({
          studentID: teacher.studentID,
          fullName: teacher.fullName,
          dateOfBirth: teacher.dateOfBirth,
          gender: teacher.gender,
          state: teacher.state,
        });
      }
    }
    if (data.length == 0) data = 'Err';
    res.send(data);
  }
  async UpdateStudent(req, res) {
    let data = req.body.data;
    let ud = await CRUD.UpdateStudent(data);
    res.send('oke');
  }
}
module.exports = new studentController();
