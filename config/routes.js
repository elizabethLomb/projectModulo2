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
router.get('/quejas/crear', authMiddleware.isAuthenticated, complainController.create);
router.post('/quejas/crear', authMiddleware.isAuthenticated, upload.single('image'), complainController.doCreate);

//crear usuario
router.get('/users/new', authMiddleware.isNotAuthenticated, usersController.new)
router.post('/users', authMiddleware.isNotAuthenticated, upload.single('avatar'), usersController.create)
//router.get('/users/:token/validate', usersController.validate)

//login
router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

router.get('/results', authMiddleware.isAuthenticated, controller.results);

router.get('/quejas/detalle/:id', authMiddleware.isAuthenticated, complainController.detailComplain);

router.get('/me/edit', authMiddleware.isAuthenticated, usersController.edit);
router.post('/me/edit', authMiddleware.isAuthenticated, usersController.doEdit);

router.get('/:username', authMiddleware.isAuthenticated, usersController.profile);
router.get('/:username/:complainType', authMiddleware.isAuthenticated, usersController.userComplains);

