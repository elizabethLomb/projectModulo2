const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')
const categories = require('../constants/categories')
const types = require('../constants/types')
const passport = require('passport');



//nuevo usuario
module.exports.new = (req, res, next) => {
  res.render('users/new', { user: new User() })
}

//nuevo
module.exports.create = (req, res, next) => { 
  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    bio: req.body.bio,
    city: req.body.city,
    password: req.body.password,
    avatar: req.file ? req.file.url : "/images/avataaars.png"
  })

  user.save()
  .then(user => {
    //HACER:
    //mailer.sendValidateEmail(user)
    console.log(user)
    res.redirect('/login')
  }).catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render('users/new', { user, error: error.errors })
    } else if (error.code === 11000) {
      res.render('users/new', {
        user: {
          ...user,
          password: null
        },
        genericError: 'User exists'
      })
    } else {
      next(error);
    }
  })
}

//HACER: validacion
// module.exports.validate = (req, res, next) => {
//   User.findOne({ validateToken: req.params.token })
//     .then(user => {
//       if (user) {
//         user.validated = true
//         user.save()
//           .then(() => {
//             res.redirect('/login')
//           })
//           .catch(next)
//       } else {
//         res.redirect('/')
//       }
//     })
//     .catch(next)
// }

module.exports.login = (req, res, next) => {
  res.render('users/login')
}

module.exports.doSocialLogin = (req, res, next) => {
  const socialProvider = req.params.provider
  
  passport.authenticate(`${socialProvider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.session.user = user;
      res.redirect('/')
    }
  })(req, res, next);
}

//login
module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.render('users/login', { user: req.body })
  }

  User.findOne({ email: email, validated: true })
    .then(user => {
      if (!user) {
        res.render('users/login', {
          user: req.body,
          error: { password: 'invalid password' }
        })
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              res.render('users/login', {
                user: req.body,
                error: { password: 'invalid password' }
              })
            } else {
              req.session.user = user;
              req.session.genericSuccess = 'Welcome!'
              res.redirect('/');
            }
          })
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/login', {
          user: req.body,
          error: error.error
        })
      } else {
        next(error);
      }
    });
}

//logout
module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}

//profile
module.exports.profile = (req, res, next) => {
  User.findOne({ username: req.params.username })
  .populate({
    path: 'complains',
    populate: {
      path: 'user'
    }
  })

  .then(user => {
    if (user) {
      res.render('users/profile', { user, complains: user.complains })
    } else {
      req.session.genericError = 'user not found'
      res.redirect('/')
    }
  })
  .catch(next)
}

//ver mis quejas
module.exports.userComplains = (req, res, next) => {
  if (['quejas', 'sugerencias'].includes(req.params.complainType)) {
    User.findOne({ username: req.params.username })
    .sort({ createdAt: -1 })
    .populate({
      path: 'complains',
      match: { type: req.params.complainType === 'quejas' ? 'Queja' : 'Sugerencia' },
      populate: {
        path: 'user'
      }
    })
  
    .then(user => {
      console.log({ user })
      res.render('users/profile', { user })
    }).catch(next)
  } else {
    next(createError(404));
  }
}

//edit
module.exports.edit = (req, res, next) => {
  res.render('users/new', { user: req.currentUser })
}

module.exports.doEdit = (req, res, next) => {
  User.findByIdAndUpdate( req.currentUser._id, req.body , { runValidators: true, new: true })
    .then(user => {
      if (user) {
        req.session.user = user
        res.redirect(`/${req.currentUser.username}`)
      } else {
        next(createError(404, `User not found`));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('/me/edit', { user: req.body, error: error.errors })
      } else {
        next(error);
      }
    })
}
