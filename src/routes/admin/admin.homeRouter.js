import express from 'express';
let router = express.Router();
const AdminHomeController = require('../../controller/admin/admin.homeController');
const AdminBookingController = require('../../controller/admin/admin.bookingController');
const AdminBillController = require('../../controller/admin/admin.billController');
const AdminLoginController = require('../../controller/admin/admin.loginController');
const AdminSystemController = require('../../controller/admin/admin.systemController');

//------Login----------------
router.get('/login', AdminLoginController.Login);
router.get('/logout', AdminLoginController.Logout);
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

//-------------------Thiết lập---------------------
// phòng
router.get(
  '/room',
  AdminLoginController.CheckLogin,
  AdminSystemController.Room
);
// view
router.get(
  '/room-edit/:roomID',
  AdminLoginController.CheckLogin,
  AdminSystemController.EditRoomController
);
//xử lý
router.post(
  '/room-edit',
  AdminLoginController.CheckLogin,
  AdminSystemController.EditRoom
);
// view
router.get(
  '/room/create',
  AdminLoginController.CheckLogin,
  AdminSystemController.CreateRoomController
);
// xử lý
router.post(
  '/room/create',
  AdminLoginController.CheckLogin,
  AdminSystemController.CreateRoom
);

//loại phòng
//view
router.get(
  '/room-type',
  AdminLoginController.CheckLogin,
  AdminSystemController.RoomType
);
router.get(
  '/room-type-edit/:roomID',
  AdminLoginController.CheckLogin,
  AdminSystemController.EditRoomTypeController
);
router.get(
  '/room-type/create',
  AdminLoginController.CheckLogin,
  AdminSystemController.CreateRoomTypeController
);

router.post(
  '/room-type-edit',
  AdminLoginController.CheckLogin,
  AdminSystemController.EditRoomType
);
router.post(
  '/room-type/create',
  AdminLoginController.CheckLogin,
  AdminSystemController.CreateRoomType
);

//người dùng
router.get(
  '/manager',
  AdminLoginController.CheckLogin,
  AdminSystemController.Manager
);
router.get(
  '/edit-admin/:adminID',
  AdminLoginController.CheckLogin,
  AdminSystemController.EditManagerController
);

router.get(
  '/create-manager',
  AdminLoginController.CheckLogin,
  AdminSystemController.CreateManagerController
);

router.post(
  '/manager',
  AdminLoginController.CheckLogin,
  AdminSystemController.EditManager
);
router.post(
  '/create-manager',
  AdminLoginController.CheckLogin,
  AdminSystemController.CreateManager
);

module.exports = router;
