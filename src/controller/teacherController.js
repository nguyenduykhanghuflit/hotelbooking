const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');

class teacherController {
  async Teacher(req, res) {
    let teachers = await CRUD.getAllTeacher();
    let assignments = [];

    for (let el of teachers) {
      let assiNum = await CRUD.getSchedulesByTeacherID(el.teacherID);
      assignments.push(assiNum);
    }

    let data = [teachers, assignments];

    res.render('teacher/teacher.ejs', { data });
  }

  async SearchTeacher(req, res) {
    let keyword = req.body.keyword;
    let teachers = await CRUD.getAllTeacher();
    let listTeacher = {};
    let data = [];

    for (let teacher of teachers) {
      if (teacher.fullName.toLowerCase().includes(keyword.toLowerCase())) {
        let assiNum = await CRUD.getSchedulesByTeacherID(teacher.teacherID);

        data.push({
          fullName: teacher.fullName,
          specialize: teacher.specialize,
          teacherID: teacher.teacherID,
          assiNum: assiNum.length,
        });
      }
    }
    if (data.length == 0) data = 'Err';
    res.send(data);
  }

  async Assignment(req, res) {
    let regu = CRUD.regu();
    let data = await CRUD.getCurrentScholastic();
    let ret = [regu, data];
    res.render('teacher/assignment.ejs', { data: ret });
  }

  async HandleAssignment(req, res) {
    let currentScholastic = await CRUD.getCurrentScholastic();
    let year = currentScholastic.scholasticID.slice(2);
    let assignment = req.body.assignment;
    let result = [];
    for (let i = 0; i < assignment.length; i++) {
      let classID = 'CL' + assignment[i].className + year;
      let subject = assignment[i].subject;
      let teacherID = assignment[i].teacherID;
      let message = await CRUD.CheckAssignment(classID, subject, teacherID);
      result.push(message);
    }

    res.send(result);
  }

  async CreateAssignment(req, res) {
    let currentScholastic = await CRUD.getCurrentScholastic();
    let year = currentScholastic.scholasticID.slice(2);
    let assignment = req.body.assignment;
    let result = '';
    for (let i = 0; i < assignment.length; i++) {
      let classID = 'CL' + assignment[i].className + year;
      let subject = assignment[i].subject;
      let teacherID = assignment[i].teacherID;
      let message = await CRUD.CreateAssignment(classID, subject, teacherID);
      result = message;
    }

    res.send(result);
  }
  async AssignmentDetail(req, res) {
    let teacherID = req.params.teacherID;
    //info
    let teachers = await CRUD.getTeacherByTeacherID(teacherID);
    //GIÁO VIÊN CHỦ NHIỆM LỚP
    let classes = await CRUD.getClassNameByHeadTeacher(teachers[0].fullName);
    let className = classes[0].className;
    //Đang dạy bao nhiêu
    let assignment = await CRUD.getSchedulesByTeacherID(teacherID);
    let assiNum = assignment.length;
    //Những lớp đang dạy
    let listClass = [];
    for (let assi of assignment) {
      let classID = assi.classID;
      let className = await CRUD.getClassByClassID(classID);
      listClass.push(className[0].className);
    }
    let data2 = { className, assiNum, listClass };
    let data = [teachers[0], data2];
    res.render('teacher/assignment-detail', { data });
  }

  async ShowTeacherBySpecialize(req, res) {
    let specialize = req.body.subject;
    let allAssignment = await CRUD.getAllAssignment();
    let teachers = await CRUD.getTeacherBySpecialize(specialize);

    let teacherInfo = []; //output
    let assignmentList = []; //output
    let data = []; //data

    for (const teacher of teachers) {
      let teacherID = teacher.teacherID;
      let fullName = teacher.fullName;
      let schedules = await CRUD.getSchedulesByTeacherID(teacherID);
      let assignmentNum = schedules.length;
      let classList = [];
      for (const el of schedules) {
        let classID = el.classID;
        let classes = await CRUD.getClassByClassID(classID);
        let className = classes[0].className;
        classList.push(className);
      }
      teacherInfo.push({
        teacherID,
        fullName,
        assignmentNum,
        classList,
      });
    }

    allAssignment.forEach((el) => {
      assignmentList.push({
        className: el.classID.slice(2, 4),
        subject: el.subject,
      });
    });

    data.push(teacherInfo);
    data.push(assignmentList);

    res.send(data);
  }

  AddTeacher(req, res) {
    res.render('teacher/add-teacher.ejs');
  }
}
module.exports = new teacherController();
