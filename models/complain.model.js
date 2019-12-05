const mongoose = require('mongoose');

require('./comment.model')
// require('./like.model')
const categories = require('../constants/categories');
const types = require('../constants/types');


const complainSchema = new mongoose.Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  type: {
    type: String,
    enum: types,
    required: true,
  },
  subject: {
    type: String,
    enum: categories,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  hashtags: {
    type: [String]
  },
  images: {
    type: String
  }
}, { timestamps: true })

complainSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'complain',
  justOne: false,
});

// tweetSchema.virtual('likes', {
//   ref: 'Like',
//   localField: '_id',
//   foreignField: 'tweet',
//   justOne: false,
// });

const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;