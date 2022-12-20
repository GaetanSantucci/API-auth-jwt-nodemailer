// ~ DEBUG CONFIG ~ //

import debug from 'debug';
const logger = debug('Email');

const mailSignUp = (username) => {
  logger('username: ', username);
  return {
    from: `"Bienvenu chez Virtual GS 👻" ${process.env.EMAIL_ACCOUNT}`, // sender address
    to: "gaetan.santucci@outlook.com", // list of receivers
    subject: `Hello ${username}✔`, // Subject line
    text: "Hello world?", // plain text body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js', // html body
  }
}

const connectEmail = (username) => {
  return {
    from: `"Information de connection" ${process.env.EMAIL_ACCOUNT}`, // sender address
    to: "gaetan.santucci@outlook.com", // list of receivers
    subject: `Hello ${username}`, // Subject line
    text: "Hello world?", // plain text body
    html: '<b>Bonjour, </b><br> Vous venez de vous connecter sur notre plateforme <br> Si toutefois vous n\'etes pas a l\origine de cette connection, veuillez nous contacter a cette adresse suivante : <br> gaetan.santucci@outlook.com',
  }
}

export { mailSignUp, connectEmail }