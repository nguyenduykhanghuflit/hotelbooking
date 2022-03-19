import express from 'express';
let router = express.Router();
const classController = require('../controller/classController');

router.get('/class-division', classController.ShowClassList);
router.post('/class-division', classController.ClassDivision);
router.get('/:classID', classController.ClassDetail);
router.get('/', classController.ShowClass);
router.post('/', classController.ShowClassByGrade);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
