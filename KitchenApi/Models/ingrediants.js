const mongoose = require('mongoose');
const ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
  },
  quantity: {
    type: String,
  },
});

module.exports = new mongoose.model('ingredients', ingredientSchema);
