const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const generateRandomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name needs at last 3 chars'],
    trim: true
  },
  lastname: {
    type: String,
    // required: [true, 'Name is required'],
    minlength: [3, 'Name needs at last 3 chars'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Email is invalid']
  },
  bio: {
    type: String
  },
  city: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password needs at last 6 chars']
  },
  avatar: {
    type: String,
  },
  validateToken: {
    type: String,
    default: generateRandomToken
  },
  validated: {
    type: Boolean,
    default: false
  },
  social: {
    google: String,
    facebook: String,
    slack: String
  },
}, { timestamps: true })

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.virtual('complains', {
  ref: 'Complain',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;