const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment; 