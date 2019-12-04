const mongoose = require('mongoose');

const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')

//index - short preview of complains
module.exports.index = (req, res, next) => {
  //buscador
  const criteria = req.query.search
  ? {
    body: new RegExp(req.query.search, "i")
  }
  : {}

  Complain.find(criteria)
  .sort({ createdAt: -1 })
  .limit(10)
  .populate('user')
    .then(complains => {
      res.render('index', { complains })
    }).catch(next)
}