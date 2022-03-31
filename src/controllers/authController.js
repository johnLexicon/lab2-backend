const User = require('../models/userModel');

exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    res.status(200).json(result);
  } catch (err) {
    next(err, req, res);
  }
};
