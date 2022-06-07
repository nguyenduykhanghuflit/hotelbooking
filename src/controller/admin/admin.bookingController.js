const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminBookingController {
  // trang chủ
  async BookingList(req, res) {
    res.render('admin/booking-list.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }
  async Booking(req, res) {
    res.render('admin/booking.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }

  async RoomList(req, res) {
    res.render('admin/room-list.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }
}
module.exports = new AdminBookingController();
