const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminBookingController {
  // phiếu đặt phòng
  async BookingList(req, res) {
    let since = new Date();
    since = since.toISOString().split('T')[0];

    let arrive = new Date();
    arrive.setDate(arrive.getDate() + 2);
    arrive = arrive.toISOString().split('T')[0];

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

  async Payment(req, res) {
    let bookingID = req.params.bookingID;
    let data = await ADMIN.getBookingByBookingID(bookingID);
    // res.send(data);
    res.render('admin/payment.ejs', { data });
  }

  async HandlePayment(req, res) {
    let bookingID = req.body.data.bookingID.trim();
    let data = await ADMIN.getBookingByBookingID(bookingID);
    if (data.status == 'đã trả phòng và thanh toán')
      return res.send({
        message: 'Failed',
      });
    let createBill = await ADMIN.CreateBill(data);
    if (createBill.message == 'success') {
      let updateBooking = await ADMIN.UpdateBooking(
        bookingID,
        'đã trả phòng và thanh toán'
      );
      console.log(updateBooking);
      let AutoCancelBooking = await ADMIN.AutoCancelBooking();
      console.log(AutoCancelBooking);
      return res.send(createBill);
    }
    return res.send({
      createBill,
    });
  }
  async UpdateStatusBooking(req, res) {
    let bookingID = req.body.data.bookingID,
      roomID = req.body.data.roomID;
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
