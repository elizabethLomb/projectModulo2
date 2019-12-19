const nodemailer = require('nodemailer');

const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

module.exports.sendValidateEmail = (targetUser) => {
  transporter.sendMail({
    from: `"Quejas Madrid" <${user}>`,
    to: targetUser.email,
    subject: 'Bienvenido a Quejas Madrid!',
    html: `
      <h1>Welcome</h1>
      <a href='${APP_HOST}/users/${targetUser.validateToken}/validate'>Confirm account</a>
    `
  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}

module.exports.sendComplain = (targetUser) => {
  transporter.sendMail({
    from: `"Quejas Madrid" <${user}>`,
    to: `"Quejas Madrid" <complainsmadrid@gmail.com>`,
    subject: 'Nueva queja!',
    html: `
      <h1>Hello Test</h1>

    `
  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}