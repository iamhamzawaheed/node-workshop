const express = require('express');
const router = express.Router();
const user = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('process', process.env)
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    user.create({ firstName, lastName, email, password })
    res.send(`Hello, ${req.query.person}!`);
  } catch (error) {
    res.status(400).send('something went wrong');
  }
});

module.exports = router;
