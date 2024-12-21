const axios = require('axios');
const Recipe = require('../Models/Recipe');
const cloudinary = require('../Config/Cloudinary');

const uploadRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;
    console.log(ingredients);
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients are required' });
    }

    const prompt = `Give me a good recipe using these ingredients: ${ingredients.join(
      ' , '
    )}`;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        prompt,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const recipe = response.data.choices[0]?.text.trim();
    if (!recipe) {
      return res.status(500).json({ error: 'Failed to generate recipe' });
    }
    const savedRecipe = await Recipe.create({
      ingredients,
      recipe,
      createdAt: new Date(),
    });
    res
      .status(200)
      .json({ message: 'Recipe generated successfully', recipe: savedRecipe });
  } catch (error) {
    console.error('Error in uploadRecipes:', error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while generating the recipe' });
  }
};

const downloadRecipes = async (req, res) => {
  const recipe = await Recipe.find({});
  if (!recipe) return res.status(400).json({ msg: 'something went wrong' });
  res.status(200).json({ recipe });
};
const updateRecipes = async (req, res) => {
  const { id } = req.query;
  const response = await cloudinary.uploader.upload(req.file.path, {
    folder: 'Kitchen/Recipes',
  });

  const recipe = await Recipe.findOneAndUpdate(
    { _id: id },
    { image: response.secure_url }
  );

  res.status(200).json({ recipe, url: response.secure_url });
};

module.exports = {
  uploadRecipes,
  downloadRecipes,
  updateRecipes,
};
