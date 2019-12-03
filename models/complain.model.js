const mongoose = require('mongoose');

require('./comment.model')
// require('./like.model')

const complainSchema = new mongoose.Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: ['Queja', 'Sugerencia']
  },
  subject: {
    type: ['Animales', 'Alimentación', 'Atención al Ciudadano', 'Atención al Contribuyente', 'Consumo', 'Cultura', 'Deportes', 'Economía', 'Educación', 'Empleo', 'Informática y Comunicaciones', 'Justicia', 'Juventud', 'Medio Ambiente', 'Otros', 'Políticas Sociales', 'Protección Ciudadana', 'Protección de datos', 'Sanidad', 'Transportes', 'Turismo', 'Urbanismo', 'Vivienda']
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