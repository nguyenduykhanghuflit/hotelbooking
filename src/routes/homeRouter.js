import express from 'express';
let router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.index);
router.get('/filter/rooms?', homeController.filterRooms);
router.get('/rooms', homeController.rooms);
router.get('/detail/:id', homeController.detailRooms);

router.get('/data', homeController.mdw, homeController.data);

module.exports = router;
