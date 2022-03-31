const User = require('../models/userModel');

exports.get = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (err) {
    next(err, req, res);
  }
};
