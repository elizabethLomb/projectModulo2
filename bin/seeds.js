require('../config/db.config')
const User = require('../models/user.model')
const Complain = require('../models/complain.model')
const Comment = require('../models/comment.model')
const faker = require('faker')


const userIds = []

Promise.all([
  User.deleteMany(),
  Complain.deleteMany(),
  Comment.deleteMany()
])
  .then(() => {
    for (let i = 0; i < 20; i++) {
      const user = new User({
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),,
        city: 'Madrid',
        password: '123123',
        avatar: faker.image.avatar(),
        validated: true,
        createdAt: faker.date.past()
      })
      user.save()
        
        .then(user => {
          userIds.push(user._id)

          for (let j = 0; j < 20; j++) {
            const complain = new Complain({
              user: user._id,
              type: complain.type[
                Math.floor(Math.random() * complain.type.length)
              ],
              subject: complain.subject[
                Math.floor(Math.random() * complain.subject.length)
              ],
              body: faker.lorem.paragraph(),
              hashtags: '#transporte',
              images: faker.random.image(),
              createdAt: faker.date.past()
            })
            complain.save()

          }
        }).catch(console.error)
    }
  }).catch(console.error)
