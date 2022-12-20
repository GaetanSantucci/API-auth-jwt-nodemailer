import jwt from 'jsonwebtoken';
import debug from 'debug';
const logger = debug('Authentification')
const { verify } = jwt;


function authenticateToken(req, res, next) {
  // get the access token from the header authorization
  const authHeader = req.headers['authorization'];
  logger('authHeader: ', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  logger('token: ', token);

  verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    logger('user: ', user);
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}

export { authenticateToken }