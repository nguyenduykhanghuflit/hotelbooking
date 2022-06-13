import express from 'express';
let router = express.Router();
const AdminHomeController = require('../../controller/admin/admin.homeController');
const AdminBookingController = require('../../controller/admin/admin.bookingController');
const AdminBillController = require('../../controller/admin/admin.billController');
const AdminLoginController = require('../../controller/admin/admin.loginController');

//------Login----------------
router.get('/login', AdminLoginController.Login);
router.post('/login', AdminLoginController.HandleLogin);

//-----------------Trang chủ---------------------
router.get('/', AdminLoginController.CheckLogin, AdminHomeController.Home);

//----------------Trang quản lý phòng----------------

// danh sách phiếu đặt phòng
router.get(
  '/booking-list',
  AdminLoginController.CheckLogin,
  AdminBookingController.BookingList
);
// api danh sách phiếu đặt phòng
router.post(
  '/booking-list',
  AdminLoginController.CheckLogin,
  AdminBookingController.FindBookingList
);
//thanh toán và trả phòng
router.get(
  '/booking-list/payment/:bookingID',
  AdminLoginController.CheckLogin,
  AdminBookingController.Payment
);
//nhận phòng
router.get(
  '/booking-list/checkout/:bookingID',
  AdminLoginController.CheckLogin,
  AdminBookingController.Checkout
);
//hủy đặt phòng
router.get(
  '/booking-list/cancel/:bookingID',
  AdminLoginController.CheckLogin,
  AdminBookingController.Cancel
);
//chi tiết đặt phòng
router.get(
  '/booking-list/detail/:bookingID',
  AdminLoginController.CheckLogin,
  AdminBookingController.Detail
);
//chi tiết hóa đơn từ bookingID
router.get(
  '/booking-list/detail-bill/:bookingID',
  AdminLoginController.CheckLogin,
  AdminBookingController.DetailBillFromBookingID
);
//API xử lý thanh toán và trả phòng
router.post(
  '/booking-list/payment',
  AdminLoginController.CheckLogin,
  AdminBookingController.HandlePayment
);

// danh sách phòng
router.get(
  '/room-list',
  AdminLoginController.CheckLogin,
  AdminBookingController.RoomList
);
//đặt phòng
router.get(
  '/room-list/booking/:typeID',
  AdminLoginController.CheckLogin,
  AdminBookingController.RoomListBooing
);
router.post(
  '/room-list/checkroom',
  AdminLoginController.CheckLogin,
  AdminBookingController.CheckRoom
);
router.post(
  '/room-list/bookingroom',
  AdminLoginController.CheckLogin,
  AdminBookingController.BookingRoom
);

//--------------------hóa đơn---------------------
//danh sách hóa đơn
router.get('/bill', AdminLoginController.CheckLogin, AdminBillController.Bill);
//chi tiết hóa đơn
router.get(
  '/bill/detail/:billID',
  AdminLoginController.CheckLogin,
  AdminBillController.Detail
);

module.exports = router;
