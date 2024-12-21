const mongoose = require('mongoose');
// const ingrediants = require('./ingrediants');
const recipeSchema = mongoose.Schema(
  {
    ingrediants: {
      type: String,
    },
    recipe: {
      type: String,
      required: [true, 'Must provide Procedure'],
    },
    image: {
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = new mongoose.model('recipes', recipeSchema);
