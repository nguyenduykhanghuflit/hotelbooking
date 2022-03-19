import express from 'express';
let router = express.Router();
const admissionsController = require('../controller/admissionsController');

router.get('/', admissionsController.AllNewStudent);
router.post('/student-list', admissionsController.getStudentByGrade);
router.post('/', admissionsController.admissions);
router.get('/addstudent', admissionsController.addstudent);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
