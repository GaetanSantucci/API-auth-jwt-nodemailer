import debug from 'debug';
const logger = debug('Middleware');

const isString = (req, res, next) => {
  // on recupere le body et on controle si le titre est de type string
  if (typeof req.body.title !== 'string') throw new Error('pas le bon type');
  next();
}

// const auth = async (req, res, next) => {
//   const user = req.session.user
//   if (!user) throw new Error('Authentification failed')
//   console.log('Authentification validated');
//   next();
// }

const isAdmin = async (req, res, next) => {
  const isAdmin = req.session.user.isadmin
  if (isAdmin) {
    req.session.admin = isAdmin
    logger('Welcome to the administrator interface')
  }
  next();
}

export { isString,/*  auth, */ isAdmin }