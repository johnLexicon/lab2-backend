const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  short: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },

  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
