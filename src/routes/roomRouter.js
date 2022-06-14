import express from 'express';
let router = express.Router();
const roomController = require('../controller/roomController');
const authController = require('../controller/authController');
router.get('/filter', roomController.FilterRooms);
router.get('/detail/:typeID', roomController.DetailRooms);
router.get(
  '/booking/:typeID',
  authController.CheckLogin,
  roomController.Booking
);

// api kiểm tra đặt phòng
router.post(
  '/check-data-booking',
  authController.CheckLogin,
  roomController.CheckBooking,
  roomController.CheckDataBooking
);
router.post(
  '/booking',
  authController.CheckLogin,
  roomController.CheckBooking,
  roomController.CreateBooking
);

router.get('/', roomController.Rooms);
module.exports = router;
