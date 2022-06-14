import express from 'express';
let router = express.Router();
const homeController = require('../controller/homeController');
const authController = require('../controller/authController');

router.get('/', homeController.Home);
router.get('/info', authController.ReturnInfoUser);
router.get('/register', authController.Register);
router.post('/register', authController.HandleRegister);
router.get('/data', authController.CheckLogin, homeController.data);
router.post('/info', authController.GetInfoUser);
router.get('/logout', authController.Logout);

module.exports = router;
