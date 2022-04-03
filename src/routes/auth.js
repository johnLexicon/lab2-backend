const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/signup', authController.signUp);

authRouter.post('/login', authController.login);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
