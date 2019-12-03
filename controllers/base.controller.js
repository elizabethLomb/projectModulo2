const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../models/user.model')
const Complain = require('../models/complain.model')
//const Comment = require('../models/comment.model')

module.exports.base = (req, res, next) => {
};