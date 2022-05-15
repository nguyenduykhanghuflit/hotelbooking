import express from 'express';
let router = express.Router();
const homeController = require('../controller/homeController');
const authController = require('../controller/authController');

router.get('/', homeController.Home);

router.get('/data', authController.CheckLogin, homeController.data);
router.post('/info', authController.GetInfoUser);

module.exports = router;
