import express from 'express';
let router = express.Router();
const testController = require('../controller/testController');

router.get('/', testController.test);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
