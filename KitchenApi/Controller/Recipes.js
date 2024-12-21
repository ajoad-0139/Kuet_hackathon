const cloudinary = require('../Config/Cloudinary');
const uploadRecipes = async (req, res) => {};
const downloadRecipes = async (req, res) => {};
const updateRecipes = async (req, res) => {
  const response = await cloudinary.uploader.upload(req.file.path, {
    folder: 'Kitchen/Recipes',
  });
  res.json({ url: response.secure_url });
};

module.exports = {
  uploadRecipes,
  downloadRecipes,
  updateRecipes,
};
