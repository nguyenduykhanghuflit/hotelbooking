import express from 'express';
let router = express.Router();
const authController = require('../controller/authController');

router.get('/', authController.Login);
router.post('/', authController.HandleLogin);

module.exports = router;
