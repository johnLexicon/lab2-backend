const userRouter = require('express').Router();
const usersController = require('../controllers/usersController');

userRouter.get('/', usersController.get);

module.exports = userRouter;
