import express from 'express';
let router = express.Router();
const errController = require('../controller/errController');

router.get('/:err', errController.Err);

module.exports = router;
