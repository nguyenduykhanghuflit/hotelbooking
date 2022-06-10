const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminHomeController {
  // trang chủ
  async Bill(req, res) {
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

    let data = await ADMIN.getAllBillList(since, arrive);
    res.render('admin/bill.ejs', { data });
    // res.send(data);
  }
  async Detail(req, res) {
    let billID = req.params.billID;

    let data = await ADMIN.getBillByBillID(billID);
    res.send(data);
  }
}
module.exports = new AdminHomeController();
