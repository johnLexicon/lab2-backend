const userRouter = require('express').Router();
const usersController = require('../controllers/usersController');
const { requireAuth } = require('../middleware/authMiddleware');

userRouter.get('/', requireAuth, usersController.get);

module.exports = userRouter;
