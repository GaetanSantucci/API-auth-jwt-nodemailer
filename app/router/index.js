// ~ *** *** ROUTER CONFIG *** *** ~ //
import { getAllArticles, getArticle, createArticle, updateArticle, deleteArticle } from '../controller/article.js';
import { getAllUsers, doSignUp, doSignIn, getUserProfile, updateUserProfile, deleteUserProfile } from '../controller/user.js';
import { isString, isAdmin } from '../middleware/index.js';
import { authenticateToken } from '../middleware/auth.js';

import { Router } from 'express';
const router = Router();

import { userSchema } from '../schema/user.js';
import { validate } from '../service/validation.js'


router.get('/', (req, res) => {
  res.send('Hello, world!');
});


router.get('/articles', getAllArticles);
router.get('/articles/:id', getArticle);
router.post('/articles', isString, createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

router.get('/users', getAllUsers);
router.post('/users/signup', validate(userSchema), doSignUp);
router.post('/users/signin', doSignIn);
router.get('/users/profile', authenticateToken, getUserProfile);
router.put('/users/profile/:id', updateUserProfile);
router.delete('/users/profile/:id', deleteUserProfile);

export { router };