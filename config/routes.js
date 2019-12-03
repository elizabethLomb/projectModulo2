const express = require('express');
const router = express.Router();

const controller = require('../controllers/base.controller')
//const usersController = require('../controllers/users.controller')
const complainController = require('../controllers/complain.controller')

module.exports = router;


router.get('/', complainController.index);

router.get('/quejas', controller.complainsIndex);
router.get('/sugerencias', controller.suggestionsIndex);

router.get('/results', controller.results);

