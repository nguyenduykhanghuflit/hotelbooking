import express from 'express';
let router = express.Router();
const teacherController = require('../controller/teacherController');

router.get('/add-teacher', teacherController.AddTeacher);
router.get('/assignment', teacherController.Assignment);
router.post('/assignment', teacherController.HandleAssignment);
router.post('/create-assignment', teacherController.CreateAssignment);
router.get('/assignment/:teacherID', teacherController.AssignmentDetail);
router.post('/', teacherController.ShowTeacherBySpecialize);
router.post('/searchTeacher', teacherController.SearchTeacher);
router.get('/', teacherController.Teacher);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
