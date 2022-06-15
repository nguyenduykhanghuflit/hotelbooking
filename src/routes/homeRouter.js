import express from 'express';
let router = express.Router();
const homeController = require('../controller/homeController');
const authController = require('../controller/authController');

router.get('/', homeController.Home);

router.get('/location', homeController.Location);
router.get('/hotel', homeController.Hotel);
router.get('/info', authController.ReturnInfoUser);
router.post('/info/update', authController.UpdateInfo);
router.get('/my-booking', authController.GetBookingByUsername);
router.get('/cancel/:bookingID', authController.Cancel);
router.get('/register', authController.Register);
router.post('/register', authController.HandleRegister);
router.get('/data', authController.CheckLogin, homeController.data);
router.post('/info', authController.GetInfoUser);
router.get('/logout', authController.Logout);

module.exports = router;
