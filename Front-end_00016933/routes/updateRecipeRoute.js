const express = require('express');
const router = express.Router();

const Recipe = require('../data/recipes');

router.get('/updateRecipeForm/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.render('updateRecipeForm', { recipe: recipe });
    } catch {
        res.redirect('/');
    }
});

router.put('/updateRecipeForm/:id', async (req, res) => {
    let recipe;
    try {
        recipe = await Recipe.findById(req.params.id);
        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.steps = req.body.steps;
        await recipe.save();
        res.redirect(`/recipes/${recipe.id}`);
    } catch {
        if (recipe == null) {
            res.redirect('/');
        } else {
            res.render('updateRecipeForm', { recipe: recipe, errorMessage: 'Error updating Recipe' });
        }
    }
});

module.exports = router;
