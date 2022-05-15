import express from 'express';
let router = express.Router();
const roomController = require('../controller/roomController');
const authController = require('../controller/authController');
router.post('/filter', roomController.FilterRooms);
router.get('/detail/:typeID', roomController.DetailRooms);
router.get(
  '/booking/:typeID',
  authController.CheckLogin,
  roomController.Booking
);
router.get('/', roomController.Rooms);
module.exports = router;
