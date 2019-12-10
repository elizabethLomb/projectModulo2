const express = require('express');
const router = express.Router();

const controller = require('../controllers/base.controller')
const usersController = require('../controllers/users.controller')
const complainController = require('../controllers/complain.controller')
const upload = require('./cloudinary.config');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = router;

router.get('/', authMiddleware.isAuthenticated, complainController.index);
router.get('/quejas', authMiddleware.isAuthenticated, controller.complainsIndex);
router.get('/sugerencias', authMiddleware.isAuthenticated, controller.suggestionsIndex);

//crear nueva queja
router.get('/quejas/crear', complainController.create);
router.post('/quejas/crear', upload.single('image'), complainController.doCreate);

router.get('/quejas/detalle/:id', complainController.detailComplain);

//crear usuario
router.get('/users/new', authMiddleware.isNotAuthenticated, usersController.new)
router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), usersController.create)
//router.get('/users/:token/validate', usersController.validate)

//login
router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

router.get('/:username', usersController.profile);
router.get('/:username/edit', usersController.edit);
router.post('/:username/edit', usersController.doEdit);

router.get('/results', controller.results);

