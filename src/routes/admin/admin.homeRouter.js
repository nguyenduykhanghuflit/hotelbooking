import express from 'express';
let router = express.Router();
const AdminHomeController = require('../../controller/admin/admin.homeController');
const AdminBookingController = require('../../controller/admin/admin.bookingController');
const AdminBillController = require('../../controller/admin/admin.billController');
router.get('/', AdminHomeController.Home);

//quản lý phòng
router.get('/booking-list', AdminBookingController.BookingList);
router.post('/booking-list', AdminBookingController.FindBookingList);
router.post(
  '/booking-list/update-status',
  AdminBookingController.UpdateStatusBooking
);
router.get('/booking-list/payment/:bookingID', AdminBookingController.Payment);
router.get(
  '/booking-list/checkout/:bookingID',
  AdminBookingController.Checkout
);
router.get('/booking-list/cancel/:bookingID', AdminBookingController.Cancel);
router.get('/booking-list/detail/:bookingID', AdminBookingController.Detail);
router.post('/booking-list/payment', AdminBookingController.HandlePayment);
router.get('/booking', AdminBookingController.Booking);
router.get('/room-list', AdminBookingController.RoomList);

//hóa đơn
router.get('/bill', AdminBillController.Bill);
router.get('/bill/detail/:billID', AdminBillController.Detail);

module.exports = router;
