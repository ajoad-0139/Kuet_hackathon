const axios = require('axios'); 
const Recipe = require('../Models/Recipe'); 

const uploadRecipes = async (req, res) => {
  try {
    const { ingredients } = req.body;
    console.log(ingredients);

    // Validate ingredients
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Ingredients are required' });
    }

    // Create a prompt for ChatGPT
    const prompt = `Give me a good recipe using these ingredients: ${ingredients.join(', ')}`;

    // Call ChatGPT API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o',
      prompt,
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 
        'Content-Type': 'application/json',
      },
    });

    const recipe = response.data.choices[0]?.text.trim();
    if (!recipe) {
      return res.status(500).json({ error: 'Failed to generate recipe' });
    }

    const savedRecipe = await Recipe.create({
      ingredients,
      recipe,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Recipe generated successfully', recipe: savedRecipe });
  } catch (error) {
    console.error('Error in uploadRecipes:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the recipe' });
  }
};




const downloadRecipes = async (req, res) => {
  //the user to download the recipe
};

module.exports = {
  uploadRecipes,
  downloadRecipes,
};
