const express = require('express');
const Router = express.Router();

const {
  uploadIngredients,
  downloadIngredients,
} = require('../Controller/Ingredients');
const { uploadRecipes, downloadRecipes } = require('../Controller/Recipes');

Router.route('/ingredients').post(uploadIngredients).get(downloadIngredients);
Router.route('/recipes').post(uploadRecipes).get(downloadRecipes);

module.exports = Router;
