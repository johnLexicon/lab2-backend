const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long']
    }
  },
  { timestamps: true }
);

// Fires before the doc is saved to the db (use function expression instead of arrow function for "this")
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static metod to login user
userSchema.statics.login = async function (email, password) {
  // The keyword "this" refers to the User model
  const user = await this.findOne({ email });
  if (!user) throw Error('Invalid credentials');
  const success = await bcrypt.compare(password, user.password); // bcrypt.compare takes care of hashing the password before comparison.
  if (!success) throw Error('Invalid credentials');
  return user; // Returns the user if login was successful.
};

module.exports = mongoose.model('User', userSchema);
