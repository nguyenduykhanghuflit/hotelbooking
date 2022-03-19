import express from 'express';
let router = express.Router();
const studyController = require('../controller/studyController');

router.get('/score', studyController.score);
router.post('/score', studyController.GetTeacher);
router.post('/handler-score', studyController.HandlerScrore);
router.post('/update-score', studyController.UpdateScore);
router.get('/', studyController.detail);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
