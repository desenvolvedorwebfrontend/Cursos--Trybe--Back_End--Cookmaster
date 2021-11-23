const express = require('express');
const User = require('../controller/User');
const Recipe = require('../controller/Recipe');
const validateLogin = require('../validations/validateLogin');
const validateRegistration = require('../validations/validateRegistration');
const validateToken = require('../validations/validateToken');
const validateRecipe = require('../validations/validateRecipe');
// const validateAdmin = require('../validations/validateAdmin');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send());
app.get('/recipes', Recipe.listRecipes);
app.get('/recipes/:id', Recipe.getById);
app.post('/users', validateRegistration, User.unique);
app.post('/login', validateLogin, User.access);
app.post('/recipes', validateToken, validateRecipe, User.recipeCreated);
app.put('/recipes/:id', validateToken, Recipe.updateById);
app.delete('/recipes/:id', validateToken, Recipe.exclude);
// app.get('/recipes:id/image', (req, res) => res.status().send());
// app.post('/recipes:id/image', (req, res) => res.status().send());
// app.get('/images/<id-da-receita>.jpeg', (req, res) => res.status().send());
// app.get('/users/admin', (req, res) => res.status().send());

module.exports = app;