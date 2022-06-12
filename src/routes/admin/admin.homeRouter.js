import express from 'express';
let router = express.Router();
const AdminHomeController = require('../../controller/admin/admin.homeController');
const AdminBookingController = require('../../controller/admin/admin.bookingController');
const AdminBillController = require('../../controller/admin/admin.billController');

//-----------------Trang chủ---------------------
router.get('/', AdminHomeController.Home);

//----------------Trang quản lý phòng----------------

// danh sách phiếu đặt phòng
router.get('/booking-list', AdminBookingController.BookingList);
// api danh sách phiếu đặt phòng
router.post('/booking-list', AdminBookingController.FindBookingList);
//thanh toán và trả phòng
router.get('/booking-list/payment/:bookingID', AdminBookingController.Payment);
//nhận phòng
router.get(
  '/booking-list/checkout/:bookingID',
  AdminBookingController.Checkout
);
//hủy đặt phòng
router.get('/booking-list/cancel/:bookingID', AdminBookingController.Cancel);
//chi tiết đặt phòng
router.get('/booking-list/detail/:bookingID', AdminBookingController.Detail);
//chi tiết hóa đơn từ bookingID
router.get(
  '/booking-list/detail-bill/:bookingID',
  AdminBookingController.DetailBillFromBookingID
);
//API xử lý thanh toán và trả phòng
router.post('/booking-list/payment', AdminBookingController.HandlePayment);
// đặt phòng trực tiếp
router.get('/booking', AdminBookingController.Booking);
// danh sách phòng
router.get('/room-list', AdminBookingController.RoomList);

//--------------------hóa đơn---------------------
//danh sách hóa đơn
router.get('/bill', AdminBillController.Bill);
//chi tiết hóa đơn
router.get('/bill/detail/:billID', AdminBillController.Detail);

module.exports = router;
