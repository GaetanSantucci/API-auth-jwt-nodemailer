import { fetchAllUsers, createData, fetchUser, fetchUserByID, updatedUserProfile, deletedUserProfile } from '../datamapper/user.js';
import { _500, _403 } from '../service/errorHandling.js';
import bcrypt from "bcrypt";
import { getAccessToken, getRefreshToken } from '../utils/jwt.js';
import nodemailer from 'nodemailer';

import debug from 'debug';
import { mailSignUp, connectEmail } from '../schema/emailOption.js';
import { sendEmail } from '../service/nodemailer.js';
const logger = debug('Controller');

//---------------------------------------------------------- Create User
const doSignUp = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    // check if the user is already signed up
    const ifExist = await fetchUser(username)
    if (!ifExist) {
      if (password !== confirmPassword) return res.json("Password don't match")
      req.body.password = await bcrypt.hash(password, 10);
      await createData(req.body);

      const mailOptions = mailSignUp(username);
      sendEmail(mailOptions);
      return res.json("User created successfully")
    } else {
      return res.json(`${username} already exists, please choose a new one`);
    }
  } catch (error) {
    return _500(error, req, res);
  }
}

//---------------------------------------------------------- Fetch All Users
const getAllUsers = async (req, res) => {
  try {
    const result = await fetchAllUsers();
    return res.json(result);
  } catch (error) {
    return _500(error, req, res);
  }
}


//---------------------------------------------------------- Login user with token
const doSignIn = async (req, res) => {

  const { username, password } = req.body;

  try {
    // check if the user exist
    const user = await fetchUser(username);

    if (!user) return res.json('The user doesn\'t exist');
    // if the user exis, check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json('Incorrect password');

    // delete user.password
    const { ["password"]: remove, ...userJwt } = user;
    logger('user: ', user);

    // generation of the two tokens
    let accessToken = getAccessToken(userJwt)
    logger('accessToken: ', accessToken);
    let refreshToken = getRefreshToken(userJwt)

    // storage of the refresh token in session
    req.session.refreshToken = refreshToken;
    const mailOptions = connectEmail(username);
    sendEmail(mailOptions);
    logger('Je suis connecte en tant que :', req.session.refreshToken);
    return res.json({ accessToken: accessToken, refreshToken: refreshToken })
  } catch (error) {
    return _403(error, req, res);
  }
}

//---------------------------------------------------------- Get the user profil after authentication with JWT
const getUserProfile = async (req, res) => {
  // get the user profile from token
  const { id } = req.user;
  try {
    const result = await fetchUserByID(id);
    return res.json(`Welcome ${result.username}, you are now connected`)
  } catch (error) {
    return _500(error, req, res);
  }
}

const updateUserProfile = async (req, res) => {
  const id = +req.params.id;
  logger('id: ', id);
  try {
    // todo faire une methode findAnd Update a la place pour renvoyer erreur si user non trouve
    const result = await updatedUserProfile(req.body, id);
    logger('userFind: ', result);
    return res.json("User updated")
  } catch (error) {
    return _500(error, req, res);

  }
}

const deleteUserProfile = async (req, res) => {
  const id = +req.params.id;
  try {
    await deletedUserProfile(id);
    return res.json('User deleted');
  } catch (error) {
    return _500(error, req, res);
  }
}

export { getAllUsers, doSignUp, doSignIn, getUserProfile, updateUserProfile, deleteUserProfile }