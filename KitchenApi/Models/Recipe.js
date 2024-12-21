const mongoose = require('mongoose');
const ingrediants = require('./ingrediants');
const recipeSchema = mongoose.Schema({
  ingrediants:{
    type: String,
  },
  recipe:{
    type: String,
    required:[true, 'Must provide Procedure']
  },
  createdAt:{
    type: Date,
  }
});

module.exports = new mongoose.model('ingredients', ingredientSchema);
