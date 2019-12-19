const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('../controllers/base.controller')
const usersController = require('../controllers/users.controller')
const complainController = require('../controllers/complain.controller')
const upload = require('./cloudinary.config');
const authMiddleware = require('../middlewares/auth.middleware');
const types = require('../constants/types')

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
router.get('/users/:token/validate', usersController.validate)

//login

router.get('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)

router.post('/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));
router.post('/facebook', authMiddleware.isNotAuthenticated, passport.authenticate('facebook-auth', { scope: ['email'] }));
router.post('/slack', authMiddleware.isNotAuthenticated, passport.authenticate('slack-auth'));
router.get('/callback/:provider', authMiddleware.isNotAuthenticated, usersController.doSocialLogin);

router.get('/results', authMiddleware.isAuthenticated, controller.results);

router.get('/quejas/detalle/:id', authMiddleware.isAuthenticated, complainController.detailComplain);

//añadir like
router.post('/quejas/:id/like', authMiddleware.isAuthenticated, complainController.like)

router.get('/me/edit', authMiddleware.isAuthenticated, usersController.edit);
router.post('/me/edit', authMiddleware.isAuthenticated, usersController.doEdit);

//comentarios
router.post('/quejas/detalle/:id/comentarios', authMiddleware.isAuthenticated, complainController.addComment)

router.get('/:username', authMiddleware.isAuthenticated, usersController.profile);
router.get('/:username/:complainType', authMiddleware.isAuthenticated, usersController.userComplains);


