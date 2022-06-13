const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');
const CRUD = require('../../services/CRUD');
import { nanoid } from 'nanoid';
const jwt = require('jsonwebtoken');

class AdminBookingController {
  //[Controller]
  async BookingList(req, res) {
    let since, arrive;
    if (req.query.dayStart && req.query.dayEnd) {
      try {
        since = new Date(req.query.dayStart);
        arrive = new Date(req.query.dayEnd);
        since = since.toISOString().split('T')[0];
        arrive.setDate(arrive.getDate() + 1);
        arrive = arrive.toISOString().split('T')[0];
      } catch (error) {
        return res.send('Lọc không hợp lệ');
      }
    } else {
      since = new Date();
      since = since.toISOString().split('T')[0];
      arrive = new Date();
      arrive.setDate(arrive.getDate() + 2);
      arrive = arrive.toISOString().split('T')[0];
    }

    let data = await ADMIN.getAllBookingList(since, arrive);

    res.render('admin/booking-list.ejs', { data });
    // res.send(data);
  }

  //API lọc phiếu đặt phòng
  async FindBookingList(req, res) {
    let checkin = req.body.data.checkin,
      checkout = req.body.data.checkout;
    let since = new Date(checkin);
    since = since.toISOString().split('T')[0];
    let arrive = new Date(checkout);
    arrive.setDate(arrive.getDate() + 1);
    arrive = arrive.toISOString().split('T')[0];
    let data = await ADMIN.getAllBookingList(since, arrive);

    res.send(data);
  }

  //[Controller]
  async Payment(req, res) {
    let bookingID = req.params.bookingID;
    let data = await ADMIN.getBookingByBookingID(bookingID);
    if (data.status != 'đã nhận phòng')
      return res.send('Hành động không hợp lệ');
    // res.send(data);
    return res.render('admin/payment.ejs', { data });
  }

  //[Controller]
  async Cancel(req, res) {
    let bookingID = req.params.bookingID;
    let data = await ADMIN.getBookingByBookingID(bookingID);
    if (data.status != 'đã đặt') return res.send('Hành động không hợp lệ');
    // res.send(data);
    else {
      let checkout = await ADMIN.UpdateBooking(bookingID, 'hủy');
      return res.redirect(req.get('referer'));
    }
  }

  //[Controller]
  async Checkout(req, res) {
    let bookingID = req.params.bookingID;
    let data = await ADMIN.getBookingByBookingID(bookingID);
    if (data.status != 'đã đặt') return res.send('Hành động không hợp lệ');
    // res.send(data);
    else {
      let checkout = await ADMIN.UpdateBooking(bookingID, 'đã nhận phòng');
      return res.redirect(req.get('referer'));
    }
  }
  //[API xử lý thanh toán và trả phòng]
  async HandlePayment(req, res) {
    let bookingID = req.body.data.bookingID.trim();
    let data = await ADMIN.getBookingByBookingID(bookingID);
    if (data.status != 'đã nhận phòng')
      return res.send({
        message: 'Failed',
      });
    let createBill = await ADMIN.CreateBill(data);
    if (createBill.message == 'success') {
      let updateBooking = await ADMIN.UpdateBooking(
        bookingID,
        'đã trả phòng và thanh toán'
      );
      let ud = await ADMIN.UpdateAllRoom();
      if (ud)
        console.log('Phiếu đặt phòng: trạng thái phòng vừa được cập nhật');
      let AutoCancelBooking = await ADMIN.AutoCancelBooking();
      createBill.bookingID = bookingID;
      return res.send(createBill);
    }
    return res.send({
      createBill,
    });
  }

  //[Controller]
  async Detail(req, res) {
    let bookingID = req.params.bookingID;

    let data = await ADMIN.getBookingByBookingID(bookingID);
    // res.send(data);
    return res.render('admin/detail-booking.ejs', { data });
  }

  //[Controller]
  async DetailBillFromBookingID(req, res) {
    let bookingID = req.params.bookingID;
    let check = await ADMIN.getBookingByBookingID(bookingID);
    if (check.status != 'đã trả phòng và thanh toán')
      return res.send('Hành động không hợp lệ');
    let data = await ADMIN.getBillByBookingID(bookingID);
    let billID = data.billID;
    res.redirect(`/admin/bill/detail/${billID}`);
  }

  //đặt phòng tại quầy
  async Booking(req, res) {
    res.render('admin/booking.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }

  //danh sách phòng
  async RoomList(req, res) {
    let data = await CRUD.getAllRoomType();
    // res.send(data);
    res.render('admin/room-list.ejs', { data });
  }

  //trang đặt phòng
  async RoomListBooing(req, res) {
    let typeID = req.params.typeID;
    let data = await CRUD.getRoomTypeById(typeID);
    if (!data) {
      return res.json({ message: 'Phòng không hợp lệ' });
    } else {
      // return res.send(data);
      return res.render('admin/roomlist-booking.ejs', { data });
    }
    // res.send(typeID);
    // res.render('admin/room-list.ejs', { data });
  }

  async CheckRoom(req, res) {
    //input
    let checkin = req.body.checkin;
    let checkout = req.body.checkout;
    let typeID = req.body.typeID;
    let amount = parseInt(req.body.amount);
    let listRoom = await CRUD.getRoomTypeById(typeID);

    //output
    let dataRes = {};

    if (listRoom.length == 0)
      return res.send((dataRes.message = 'Data Invalid'));
    if (!checkin || !checkout || !typeID)
      return res.send((dataRes.message = 'Data Invalid'));

    let listDataRoom = listRoom.roomData,
      dem = 0,
      listRoomIDReady = [];
    //đếm xem có bao nhiêu phòng còn trống
    listDataRoom.forEach((room) => {
      if (room.status == 'trống') {
        listRoomIDReady.push(room.roomID);
        dem++;
      }
    });
    if (dem >= amount) {
      dataRes.message = 'Available';
      dataRes.roomReady = listRoomIDReady;
      return res.send(dataRes);
    }

    let bookedRoom = await CRUD.getBookedRoomFromBooking(typeID, checkin);
    let flag = false;
    bookedRoom.forEach((room) => {
      let listDateBooking = room.bookingData;
      for (let i = 0; i < listDateBooking.length; i++) {
        if (
          checkin == listDateBooking[i].checkin ||
          checkin == listDateBooking[i].checkout ||
          checkout == listDateBooking[i].checkin ||
          checkout == listDateBooking[i].checkout
        ) {
          flag = false;
          break;
        } else flag = true;
      }
      if (flag) {
        listRoomIDReady.push(room.roomID);
        dem++;
      }
    });

    if (dem >= amount) {
      dataRes.message = 'Available';
      dataRes.roomReady = listRoomIDReady;
    } else {
      dataRes.message = 'Unavailable';
      dataRes.roomReady = null;
    }
    return res.send(dataRes);
  }

  async BookingRoom(req, res) {
    let roomReady = req.body.listRoom;
    let amount = parseInt(req.body.amount);
    let total = req.body.totalMoney;
    var id = nanoid(10);
    let username = `Đặt trực tiếp ${id}`;
    //create user
    let customer = await CRUD.CreateUserCustomer(username);
    if (!customer) return res.send('Không tạo được tài khoản khách hàng');

    let info = await CRUD.CreateInfoCustomer(
      username,
      req.body.fullName,
      req.body.email,
      req.body.phone
    );
    if (!info) res.send('Không tạo được thông tin khách hàng');
    // // res.send({ roomReady, amount, total });
    for (let i = 0; i < amount; i++) {
      let booking = await CRUD.CreateBooking(
        roomReady[i],
        'đã đặt',
        req.body.checkin,
        req.body.checkout,
        username,
        'Không có',
        '0',
        total
      );
      if (booking == 'Create Fail') res.send('Fail');

      let udr = await CRUD.UpdateStatusRoomByID(roomReady[i], 'đã đặt');
    }
    return res.send('Success');
  }
}
module.exports = new AdminBookingController();
