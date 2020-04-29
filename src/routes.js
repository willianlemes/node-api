const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.findById);
routes.post('/users', UserController.create);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.destroy);

module.exports = routes;

