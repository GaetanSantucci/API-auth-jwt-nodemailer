import jwt from 'jsonwebtoken';
const { sign } = jwt;
import debug from 'debug';
const logger = debug('Jwt')

// todo creer une fonction pour generer l'access token

function getAccessToken(user) {
  logger('user: ', user);
  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
  return accessToken
}

// todo creer une fonction pour generer le refresh token
function getRefreshToken(user) {
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })
  return refreshToken
}

export { getAccessToken, getRefreshToken }