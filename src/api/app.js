const express = require('express');
const User = require('../controller/User');
const Recipe = require('../controller/Recipe');
const validateLogin = require('../validations/validateLogin');
const validateRegistration = require('../validations/validateRegistration');
const validateToken = require('../validations/validateToken');
const validateRecipe = require('../validations/validateRecipe');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send());
app.get('/recipes', Recipe.listRecipes);
app.post('/users', validateRegistration, User.unique);
app.post('/login', validateLogin, User.access);
app.post('/recipes', validateToken, validateRecipe, User.recipeCreated);
// app.get('/recipes:id', (req, res) => res.status().send());
// app.patch('/recipes:id', (req, res) => res.status().send());
// app.delete('/recipes:id', (req, res) => res.status().send());
// app.get('/recipes:id/image', (req, res) => res.status().send());
// app.post('/recipes:id/image', (req, res) => res.status().send());
// app.get('/images/<id-da-receita>.jpeg', (req, res) => res.status().send());
// app.get('/users/admin', (req, res) => res.status().send());

module.exports = app;