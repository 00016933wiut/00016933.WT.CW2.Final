const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/recipes.json');
        const recipesData = fs.readFileSync(filePath);
        const recipes = JSON.parse(recipesData);

        res.render('index', { recipes });
    } catch (error) {
        console.error('Error reading recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;