import express from 'express';
let router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
// router.post('/get-data', homeController.GetData);

//thêm, hiển thị student

// router.get('/showstudent', testController.ShowStudent);

module.exports = router;
