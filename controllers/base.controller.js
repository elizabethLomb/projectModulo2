const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')

//funcion buscador
module.exports.results = (req, res, next) => {
  const criteria = req.query.search
  ? {
    body: new RegExp(req.query.search, "i")
  }
  : {}

  Complain.find(criteria)
  .sort({ createdAt: -1 })
  .limit(10)
  .populate('user')
    .then((complains, user) => {
      res.render('results', { complains: complains })
    }).catch(next)
};