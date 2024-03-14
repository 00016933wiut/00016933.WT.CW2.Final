const express = require('express');
const addNewRecipeRoute = require('./routes/addNewRecipeRoute');
const readAllRecipesRoute = require('./routes/readAllRecipesRoute');
const editRecipeRoute = require('./routes/editingExistedRecipeRoute'); 
const deleteRecipeRoute = require('./routes/deleteExistingRecipeRoute'); 
const updateRecipeRoute = require('./routes/updateRecipeRoute'); 
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', readAllRecipesRoute);
app.use('/recipes', addNewRecipeRoute);
app.use('/recipes', editRecipeRoute); 
app.use('/recipes', deleteRecipeRoute); 
app.use('/recipes', updateRecipeRoute);

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/new-recipe', (req, res) => {
    res.render('newRecipeForm');
});

app.get('/editRecipeForm', (req, res) => {
    res.render('editRecipeForm');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
