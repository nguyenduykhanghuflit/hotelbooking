import express from 'express';
let router = express.Router();
const studentController = require('../controller/studentController');

router.get('/', studentController.Student);
router.post('/', studentController.GetStudent);
router.get('/:studentID', studentController.StudentDeatail);
router.post('/update-student', studentController.UpdateStudent);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
