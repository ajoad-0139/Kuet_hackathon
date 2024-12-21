const express = require('express');
const Router = express.Router();
const upload = require('../Config/Multer');

const {
  uploadIngredients,
  downloadIngredients,
  updateIngredients,
  deleteIngredients,
} = require('../Controller/Ingredients');
const {
  uploadRecipes,
  downloadRecipes,
  updateRecipes,
} = require('../Controller/Recipes');

Router.route('/ingredients')
  .post(uploadIngredients)
  .get(downloadIngredients)
  .patch(updateIngredients)
  .delete(deleteIngredients);
Router.route('/recipes').post(uploadRecipes).get(downloadRecipes);
// .patch(upload.single('file'), updateRecipes);
Router.route('/recipes/update').post(upload.single('file'), updateRecipes);

module.exports = Router;
