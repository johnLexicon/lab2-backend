const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/signup', authController.signUp);

authRouter.post('/login', authController.login);

module.exports = authRouter;
