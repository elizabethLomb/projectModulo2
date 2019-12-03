const express = require('express');
const router = express.Router();

//const usersController = require('../controllers/users.controller')
const complainController = require('../controllers/complain.controller')

module.exports = router;


router.get('/', complainController.index);

