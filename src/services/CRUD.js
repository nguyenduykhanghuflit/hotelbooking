const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');

//-----------------------TUYỂN SINH--------------------------------------
//Thêm học sinh đồng thời thêm thuộc tính isNew=0 để phân biệt học sinh mới với học sinh cũ
let createNewStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      var id = nanoid(10);

      await db.Student.create({
        studentID: id,
        fullName: data.name,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        GN: data.GN,
        domicile: data.domicile,
        address: data.address,
        nation: data.nation,
        oldSchool: data.oldSchool,
        isNew: 0,
      });

      resolve(`Đã thêm thành công vào db, id là${id}`);
    } catch (error) {
      reject(error);
    }
  });
};

let createScrore = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      var id = nanoid(10);

      await db.Score.create({
        scoreID: id,
        subjectID: data.subject,
        studentID: data.studentID,
        score15m11: 0,
        score15m12: 0,
        score45m11: 0,
        score45m12: 0,
        testScore1: 0,
        GPA1: 0,
        score15m21: 0,
        score15m22: 0,
        score45m21: 0,
        score45m22: 0,
        testScore2: 0,
        GPA2: 0,
        GPA: 0,
      });

      resolve(`oke ne`);
    } catch (error) {
      reject('err');
    }
  });
};
//Hiển thị học sinh có thuộc tính isNew=0
let getAllNewStudent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.Student.findAll({
        where: {
          isNew: 0,
        },
        raw: true,
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};

//Xem theo khối bất kì
let getNewStudentByGrade = (grade) => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.Student.findAll({
        where: {
          GN: grade,
          isNew: 0,
        },
        raw: true,
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};
let getStudentByGrade = (grade) => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.Student.findAll({
        where: {
          GN: grade,
          isNew: 1,
        },
        raw: true,
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};
let getStudentByStudentID = (studentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.Student.findAll({
        where: {
          studentID: studentID,
          isNew: 1,
        },
        raw: true,
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};

//-----------------------PHÂN LỚP--------------------------------------
//Phân lớp: cập nhật classID
let classDiv = (classID, studentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getCurrentScholastic();
      let id = classID + data.scholasticID.slice(2);
      await db.Student.update(
        { classID: id, isNew: 1, state: 'Đang học' },
        { where: { studentID: studentID } }
      );
      resolve(`Thành công, ${studentID} lớp ${id}`);
    } catch (error) {
      reject(error);
    }
  });
};

//Lấy sỉ số của classID bất kì
let getNumberOfClass = (classID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const number = await db.Classes.findByPk(classID);
      resolve(number.numberOfClass);
    } catch (error) {
      reject(error);
    }
  });
};

//Cộng 1 vào sỉ số lớp
let updateNumberOfClass = (classID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getCurrentScholastic();
      let id = classID + data.scholasticID.slice(2);
      let ans = await getNumberOfClass(id);
      let num = ans + 1;
      await db.Classes.update(
        { numberOfClass: num },
        { where: { classID: id } }
      );
      resolve(`Thành công, ${id} sỉ số ${num}`);
    } catch (error) {
      reject(error);
    }
  });
};

//-----------------------XEM LỚP--------------------------------------
let getAllClass = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getCurrentScholastic();
      let scholastic = data.scholasticID;
      let classes = await db.Classes.findAll({
        where: { scholasticID: scholastic },
        raw: true,
      });
      resolve(classes);
    } catch (error) {
      reject(error);
    }
  });
};
let getClass = (classID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getCurrentScholastic();
      let scholastic = data.scholasticID;
      let classes = await db.Classes.findAll({
        where: {
          classID: { [Op.startsWith]: classID },
          scholasticID: scholastic,
        },
        raw: true,
      });
      resolve(classes);
    } catch (error) {
      reject(error);
    }
  });
};

let getClassByClassID = (classID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let classes = await db.Classes.findAll({
        where: {
          classID: classID,
        },
        raw: true,
      });
      resolve(classes);
    } catch (error) {
      reject(error);
    }
  });
};

let getStudentByClassID = (classID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.Student.findAll({
        where: {
          classID: classID,
        },
        raw: true,
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllTestData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Test.findAll({
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllStudent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let students = await db.Student.findAll({
        where: {
          isNew: 1,
        },
        raw: true,
      });
      resolve(students);
    } catch (error) {
      reject(error);
    }
  });
};

let regu = () => {
  return 3;
};

let getCurrentScholastic = async () => {
  let scholastics = await getScholastic();
  let currentScholastic = {};
  scholastics.forEach((scholastic) => {
    if (scholastic.semester1 == 1 || scholastic.semester2 == 1) {
      currentScholastic.year = scholastic.year;
      currentScholastic.scholasticID = scholastic.scholasticID;
      if (scholastic.semester1 == 1) currentScholastic.semester = 'Học kỳ 1';
      if (scholastic.semester2 == 1) currentScholastic.semester = 'Học kỳ 2';
    }
  });
  return currentScholastic;
};
let getScholastic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let scholastic = await db.Scholastic.findAll({
        raw: true,
      });
      resolve(scholastic);
    } catch (error) {
      reject(error);
    }
  });
};

//TEACHER
//lấy tất cả giáo viên theo

let getAllTeacher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.Teacher.findAll({
        raw: true,
      });
      resolve(teachers);
    } catch (error) {
      reject(error);
    }
  });
};

//lấy giáo viên theo môn học
let getTeacherBySpecialize = (specialize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.Teacher.findAll({
        where: { specialize: specialize },
        raw: true,
      });
      resolve(teachers);
    } catch (error) {
      reject(error);
    }
  });
};
let getClassNameByHeadTeacher = (headTeacher) => {
  return new Promise(async (resolve, reject) => {
    try {
      let classes = await db.Classes.findAll({
        where: { headTeacher: headTeacher },
        raw: true,
      });
      resolve(classes);
    } catch (error) {
      reject(error);
    }
  });
};
//lấy giáo viên bằng ID
let getTeacherByTeacherID = (teacherID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.Teacher.findAll({
        where: { teacherID },
        raw: true,
      });
      resolve(teachers);
    } catch (error) {
      reject(error);
    }
  });
};
//lấy bảng điểm

let getScroreBySubjectAndStudentID = (subject, studentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let scores = await db.Score.findAll({
        where: { subjectID: subject, studentID },
        raw: true,
      });
      resolve(scores);
    } catch (error) {
      reject(error);
    }
  });
};

//lấy phân công của giáo viên theo ID
let getSchedulesByTeacherID = (teacherID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedules = await db.Schedule.findAll({
        where: { teacherID: teacherID },
        raw: true,
      });
      resolve(schedules);
    } catch (error) {
      reject(error);
    }
  });
};

//lấy tất cả phân công trong bảng phân công
let getAllAssignment = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedules = await db.Schedule.findAll({
        raw: true,
      });
      resolve(schedules);
    } catch (error) {
      reject(error);
    }
  });
};

let CheckAssignment = async (classID, subject, teacherID) => {
  let checkFull = await CheckAssignmentByTeacherID(teacherID);
  let checkExists = await CheckAlreadyExists(classID, subject);
  let message = {
    full: checkFull,
    exists: checkExists,
  };
  return message;
};

//đếm số lượng phân công của giáo viên, nhận vào teacherID return true false
let CheckAssignmentByTeacherID = async (teacherID) => {
  let count = await getSchedulesByTeacherID(teacherID);
  return count.length == 3
    ? `${teacherID} full`
    : `${teacherID} ${count.length}`;
};

//kiểm tra lớp đã có giáo viên chưa,subject, classID true false
let CheckAlreadyExists = async (classID, subject) => {
  let listAssignment = await getAllAssignment();
  let check = '';
  for (let i = 0; i < listAssignment.length; i++) {
    if (
      classID == listAssignment[i].classID &&
      subject == listAssignment[i].subject
    ) {
      check = classID[2] + 'A' + classID[3];
      break;
    }
    check = 'ok';
  }

  return check;
};

//thêm phân công
let CreateAssignment = (classID, subject, teacherID) => {
  return new Promise(async (resolve, reject) => {
    try {
      var id = nanoid(10);

      await db.Schedule.create({
        scheduleID: id,
        classID,
        subject,
        teacherID,
      });

      resolve('ok');
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateScore = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = data.studentID;

      await db.Score.update(
        {
          score15m11: data.score15m11,
          score15m12: data.score15m12,
          score45m11: data.score45m11,
          score45m12: data.score45m12,
          testScore1: data.testScores1,
          GPA1: data.GPA,
        },
        {
          where: { studentID: id, subjectID: data.subject },
        }
      );
      resolve(`Thành công`);
    } catch (error) {
      reject(error);
    }
  });
};

let UpdateStudent = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = data.studentID;

      await db.Student.update(
        {
          studentID: id,
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          nation: data.nation,
          state: data.state,
          domicile: data.domicile,
          address: data.address,
        },
        {
          where: { studentID: id },
        }
      );
      resolve(`Thành công`);
    } catch (error) {
      reject(error);
    }
  });
};
//sửa phân công
//xóa phân công

module.exports = {
  regu,
  createNewStudent,
  getAllNewStudent,
  getNewStudentByGrade,
  classDiv,
  getAllClass,
  updateNumberOfClass,
  getNumberOfClass,
  getClass,
  getStudentByClassID,
  getClassByClassID,
  getScholastic,
  getCurrentScholastic,
  getTeacherBySpecialize,
  getSchedulesByTeacherID,
  CreateAssignment,
  CheckAssignmentByTeacherID,
  CheckAlreadyExists,
  getAllAssignment,
  CheckAssignment,
  getAllTeacher,
  getTeacherByTeacherID,
  getClassNameByHeadTeacher,
  createScrore,
  getScroreBySubjectAndStudentID,
  UpdateScore,
  getAllStudent,
  getStudentByGrade,
  getStudentByStudentID,
  UpdateStudent,
  getAllTestData, //test
};
