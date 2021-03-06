const express = require('express');
const path = require('path');
const User = require('../controller/User');
const Recipe = require('../controller/Recipe');
const validateLogin = require('../validations/validateLogin');
const validateRegistration = require('../validations/validateRegistration');
const validateToken = require('../validations/validateToken');
const validateRecipe = require('../validations/validateRecipe');
const upload = require('../validations/uploadImage');
const validateAdmin = require('../validations/validateAdmin');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send());
app.get('/recipes', Recipe.listRecipes);
app.get('/recipes/:id', Recipe.getById);
app.post('/users', validateRegistration, User.unique);
app.post('/login', validateLogin, User.access);
app.post('/recipes', validateToken, validateRecipe, User.recipeCreated);
app.put('/recipes/:id', validateToken, Recipe.updateById);
app.delete('/recipes/:id', validateToken, Recipe.deleteById);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads'))); 
app.put('/recipes/:id/image', upload.upload.single('image'), validateToken, Recipe.image);
app.get('/images/:id', Recipe.imageRender);
// app.get('/recipes/:id/image', validateToken, (req, res) => res.status().send());
app.post('/users/admin', validateToken, validateAdmin, User.admin);

module.exports = app;