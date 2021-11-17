const express = require('express');
const validateRegistration = require('../validations/validateRegistration');
// const validateRecipe = require('../validations/validateRecipe');
// const validateToken = require('../validations/validateToken');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send());
app.post('/users', validateRegistration, (req, res) => {
  res.status(200).send('passou nos testes');
});
// app.post('/login', (req, res) => res.status().send());
// app.post('/recipes', (req, res) => res.status().send());
// app.get('/recipes', (req, res) => res.status().send());
// app.get('/recipes:id', (req, res) => res.status().send());
// app.patch('/recipes:id', (req, res) => res.status().send());
// app.delete('/recipes:id', (req, res) => res.status().send());
// app.get('/recipes:id/image', (req, res) => res.status().send());
// app.post('/recipes:id/image', (req, res) => res.status().send());
// app.get('/images/<id-da-receita>.jpeg', (req, res) => res.status().send());
// app.get('/users/admin', (req, res) => res.status().send());

module.exports = app;
