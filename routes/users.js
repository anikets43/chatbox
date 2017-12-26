const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
