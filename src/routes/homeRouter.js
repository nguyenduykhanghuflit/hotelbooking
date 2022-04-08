import express from 'express';
let router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.Index);

module.exports = router;
