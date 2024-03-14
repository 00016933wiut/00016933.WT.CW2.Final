const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.post('/', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/recipes.json');
        const recipes = JSON.parse(fs.readFileSync(filePath));
        const { recipeName, listOfIngredients, listOfSteps} = req.body;
        const newRecipeId = recipes.length + 1;
        const newRecipe = {
            id: newRecipeId,
            name: recipeName,
            ingredients: listOfIngredients,
            steps: listOfSteps
        };
        recipes.push(newRecipe);
        fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
        res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Error adding new recipe:', error);
        res.status(500).json({ message: 'Error adding new recipe' });
    }
});

module.exports = router;
