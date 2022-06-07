const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminBookingController {
  // phiếu đặt phòng
  async BookingList(req, res) {
    let data = await ADMIN.getAllBookingList();
    // res.render('admin/booking-list.ejs', { data });
    res.send(data);
  }
  //đặt phòng tại quầy
  async Booking(req, res) {
    res.render('admin/booking.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }

  //danh sách phòng
  async RoomList(req, res) {
    res.render('admin/room-list.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }
}
module.exports = new AdminBookingController();
