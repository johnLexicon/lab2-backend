const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtEcom;
    if (!token) throw Error('No token available');
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decodedToken) => {
      if (err) throw err;
      next();
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { requireAuth };
