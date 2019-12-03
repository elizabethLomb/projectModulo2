const mongoose = require('mongoose');

const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')

//index - short preview of complains
module.exports.index = (req, res, next) => {
  Complain.find()
  .sort({ createdAt: -1 })
  .limit(10)
  .populate('user')
    .then((complains, user) => {
      res.render('index', { complains: complains })
    }).catch(next)
}