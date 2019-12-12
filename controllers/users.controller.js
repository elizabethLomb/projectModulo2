const mongoose = require('mongoose');

const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')
const categories = require('../constants/categories')
const types = require('../constants/types')

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
      console.log(user.complains)
    } else {
      req.session.genericError = 'user not found'
      res.redirect('/')
    }
  })
  .catch(next)
}

//edit
module.exports.edit = (req, res, next) => {
  User.findOne({ username: req.params.username })
  .then(user => {
    res.render('users/new', { user })
  }).catch(error => next(error));
}

module.exports.doEdit = (req, res, next) => {
  //VOY POR AQUI------------------
  User.findByIdAndUpdate({ username: req.params.username })

  if (!mongoose.Types.ObjectId.isValid(id)) {
      next(createError(404));
  } else {
      Book.findByIdAndUpdate(id, req.body, { new: true })
          .then(book => {
              console.log(book)
              res.redirect('/books')
          })
          .catch(
              error => next(error)
          )
  }
}
