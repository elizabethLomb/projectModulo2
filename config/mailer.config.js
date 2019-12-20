const nodemailer = require('nodemailer');
// const complain = require('../controllers/complain.controller')
const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'
const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS
const faker = require('faker')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

// const ecomplain = ['type', 'subject', 'title', 'body',]

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

module.exports.sendComplain = (complain) => {
  transporter.sendMail({
    from: `"Quejas Madrid" <${user}>`,
    to: `"Quejas Madrid" <complainsmadrid@gmail.com>`,
    subject: 'Nueva queja!',
    html: 
    `
    <ul style="list-style-type:none;">
    <h1 style="font-size:20px;">
    <li style="color:red;">Categoria: <b>${complain.type}</b></li> <br> 
    <li style="color:pink;">Tema: <b>${complain.subject}</b></li> <br> 
    <li style="color:blue;">Titulo: <b>${complain.title}</b></li> <br> 
    </h1>
    <h2 style="font-size:15px;">
    <li>Contenido: <br> 
    ${complain.body}</li> <br> 
    </h2>
    <br> 
    <br> 
    
    <p style="color:red; font-size:10px;">
    Aviso de confidencialidad:
    ${faker.lorem.paragraphs()}</p>
  
    `


  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}