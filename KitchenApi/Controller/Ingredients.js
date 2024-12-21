const Ingredients = require('../Models/ingrediants');
const uploadIngredients = async (req, res) => {
  const { name, amount } = req.body;
  if (!name) return res.status(400).json({ msg: 'must provide ingredients' });
  const ingredient = await Ingredients.create({ name, quantity: amount });
  if (!ingredient) return res.status(400).json({ msg: 'something went wrong' });
  res.status(200).json({ ingredient });
};
const downloadIngredients = async (req, res) => {
  const ingredients = await Ingredients.find({});
  if (!ingredients)
    return res.status(400).json({ msg: 'something went wrong' });
  res.status(200).json({ ingredients });
};
const updateIngredients = async (req, res) => {
  const { id } = req.query;
  const { name, amount } = req.body;
  if (!id) return res.status(400).json({ msg: 'something went wrong' });
  const ingredient = await Ingredients.findOneAndUpdate(
    { _id: id },
    { name, quantity: amount }
  );
  if (!ingredient) return res.status(400).json({ msg: 'something went wrong' });
  res.status(200).json({ ingredient });
};
const deleteIngredients = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: 'something went wrong' });
  const response = await Ingredients.deleteOne({ _id: id });
  if (!response) res.status(400).json({ msg: 'something went wrong' });
  res.status(200).json({ msg: 'ingredient is deleted successfully' });
};

module.exports = {
  uploadIngredients,
  downloadIngredients,
  updateIngredients,
  deleteIngredients,
};
