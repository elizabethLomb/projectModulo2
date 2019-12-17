const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')
const categories = require('../constants/categories')
const types = require('../constants/types')

//vista complains
module.exports.complainsIndex = (req, res, next) => {
  Complain.find({ type: 'Queja' })
  .sort({ createdAt: -1 })
  .limit(20)
  .populate('user')
  .then(complains => {
    res.render('complains', { complains })
  }).catch(next)
}

//vista suggestions
module.exports.suggestionsIndex = (req, res, next) => {
  Complain.find({ type: 'Sugerencia' })
  .sort({ createdAt: -1 })
  .limit(20)
  .populate('user')
  .then(complains => {
    res.render('suggestions', { complains })
  }).catch(next)
}

//funcion buscador
module.exports.results = (req, res, next) => {
  const criteria = req.query.search
  ? {
    body: new RegExp(req.query.search, "i")
  }
  : {}

  Complain.find(criteria)
  .sort({ createdAt: -1 })
  .limit(20)
  .populate('user')
    .then(complains => {
      res.render('results', { complains: complains })
    }).catch(next)
};
