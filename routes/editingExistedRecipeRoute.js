const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.put('/:id', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/recipes.json');
        const recipes = JSON.parse(fs.readFileSync(filePath));
        const recipeId = parseInt(req.params.id);
        const { recipeName, listOfIngredients, listOfSteps } = req.body;
        const index = recipes.findIndex(recipe => recipe.id === recipeId);
        if (index !== -1) {
            recipes[index].name = recipeName;
            recipes[index].ingredients = listOfIngredients;
            recipes[index].steps = listOfSteps;
            fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
            res.status(200).json({ message: 'Recipe updated successfully', recipe: recipes[index] });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error editing recipe:', error);
        res.status(500).json({ message: 'Error editing recipe' });
    }
});

module.exports = router;