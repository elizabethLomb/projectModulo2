const express = require('express');
const router = express.Router();

const controller = require('../controllers/base.controller')
const usersController = require('../controllers/users.controller')
const complainController = require('../controllers/complain.controller')
const upload = require('./cloudinary.config');

module.exports = router;

router.get('/', complainController.index);
router.get('/quejas', controller.complainsIndex);
router.get('/sugerencias', controller.suggestionsIndex);

//crear nueva queja
router.get('/quejas/crear', complainController.create);
router.post('/quejas/crear', upload.single('image'), complainController.doCreate);

router.get('/quejas/detalle/:id', complainController.detailComplain);
router.get('/:username', complainController.profile);



router.get('/results', controller.results);

