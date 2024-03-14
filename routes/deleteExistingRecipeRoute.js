const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.delete('/:id', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/recipes.json');
        let recipes = JSON.parse(fs.readFileSync(filePath));
        const recipeId = parseInt(req.params.id);
        
        const index = recipes.findIndex(recipe => recipe.id === recipeId);
        if (index !== -1) {
            recipes = recipes.filter(recipe => recipe.id !== recipeId);
            fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
            res.status(200).json({ message: 'Recipe deleted successfully' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ message: 'Error deleting recipe' });
    }
});

module.exports = router;
