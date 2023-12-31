const express = require('express');
const authController = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/login', authController.logIn);

module.exports = authRouter;
