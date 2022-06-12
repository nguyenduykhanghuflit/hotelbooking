const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminBookingController {
  //[Controller]
  async BookingList(req, res) {
    let ud = await ADMIN.UpdateAllRoom();
    if (ud) console.log('Phiếu đặt phòng: trạng thái phòng vừa được cập nhật');
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
      console.log(updateBooking);
      let AutoCancelBooking = await ADMIN.AutoCancelBooking();
      console.log(AutoCancelBooking);
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
    res.render('admin/room-list.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }
}
module.exports = new AdminBookingController();
