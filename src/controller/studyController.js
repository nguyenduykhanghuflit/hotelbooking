const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');

class studyController {
  score(req, res) {
    //Nhận teacherID
    //trả về: năm học, học kì, danh sách học sinh, môn học,
    // let data = await CRUD.getStudentByClassID('CL7120192020');
    res.render('study/score.ejs');
  }
  async GetTeacher(req, res) {
    let teacherID = req.body.teacherID;
    let teacher = await CRUD.getTeacherByTeacherID(teacherID);
    let assignment = await CRUD.getSchedulesByTeacherID(teacherID);
    let currentScholastic = await CRUD.getCurrentScholastic();
    let mess = '';
    let data2 = [];
    if (typeof teacher[0] == 'undefined') {
      mess = 'Không tồn tại giáo viên có ID: ' + teacherID;
    } else {
      if (typeof assignment[0] == 'undefined')
        mess = 'Giáo viên này chưa phân công';
      else {
        let teacherName = teacher[0].fullName;
        let data = [
          {
            year: currentScholastic.year,
            semester: currentScholastic.semester,
            teacherName,
          },
        ];
        for (let i of assignment) {
          let subject = i.subject;
          let classID = i.classID;
          let classes = await CRUD.getClassByClassID(classID);
          let className = classes[0].className;
          data2.push({ subject, className });
        }
        mess = [data, data2];
      }
    }

    res.send(mess);
  }

  async HandlerScrore(req, res) {
    let data = req.body;
    let classID = data.classID;
    let subject = data.subject;
    let students = await CRUD.getStudentByClassID(classID);
    let ret = [];
    for (const student of students) {
      let studentID = student.studentID;
      let fullName = student.fullName;
      let dateOfBirth = student.dateOfBirth;
      let scores = await CRUD.getScroreBySubjectAndStudentID(
        subject,
        studentID
      );
      scores[0].fullName = fullName;
      scores[0].dateOfBirth = dateOfBirth;
      ret.push(scores[0]);
    }
    res.send(ret);
  }
  async UpdateScore(req, res) {
    let data = req.body.data;
    for (let i of data) {
      let ud = CRUD.UpdateScore(i);
      console.log(ud);
    }

    res.send(data);
  }
  detail(req, res) {
    res.render('study/detailscore.ejs');
  }
}
module.exports = new studyController();
