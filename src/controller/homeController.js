const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');
import { faker } from '@faker-js/faker';
class HomeController {
  async home(req, res) {
    let data = await CRUD.getAllTestData();

    res.send(data);
  }
  // async GetData(req, res) {
  //   let data = req.body.data;
  //   let classID = data.classID;
  //   let subject = ['Toán', 'Vật Lý', 'Hóa Học'];
  //   let student = await CRUD.getStudentByClassID(classID);
  //   for (let i = 0; i < subject.length; i++) {
  //     let sj = subject[i];
  //     for (let j of student) {
  //       let st = j.studentID;
  //       let data = { subject: sj, studentID: st };
  //       let cr = await CRUD.createScrore(data);
  //       console.log(cr);
  //     }
  //   }

  //   res.send('vừa chạy xong');
  // }
}

module.exports = new HomeController();
