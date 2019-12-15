const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  complain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complain',
    required: true
  }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;