const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const maxAge = 24 * 60 * 60; // i day in seconds

const createToken = (id) => {
  console.log(id, process.env.PRIVATE_KEY);
  return jwt.sign({ id }, process.env.PRIVATE_KEY, { expiresIn: maxAge }); // expiresIn takes a value in seconds.
};

exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    const token = createToken(createdUser.id);
    res.cookie('jwtEcom', token, { httpOnly: true, maxAge: maxAge * 1000 }); //maxAge takes a value in milliseconds
    res.status(200).json({ userId: createdUser.id, jwt: token });
  } catch (err) {
    next(err, req, res);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password); // calling custom static method in User model.
    const token = createToken(user.id);
    res.cookie('jwtEcom', token, { httpOnly: true, maxAge: maxAge * 1000 }); //maxAge takes a value in milliseconds
    res.status(200).json({ userId: user._id, jwt: token });
  } catch (err) {
    next(err, req, res);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.cookie('jwtEcom', '', { maxAge: 1 }); // Deletes cookie containing jwt
    res.status('200').json({ message: 'Logout success' });
  } catch (err) {
    next(err, req, res);
  }
};
