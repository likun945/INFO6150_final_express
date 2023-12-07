const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { verifyToken, userCanEdit } = require('../middlewares/auth');

router.post('/', UserController.getUsersByFilter);

router.post('/create', UserController.createUser);

router.put('/edit', UserController.editUser);

router.delete('/delete', UserController.deleteUser);


module.exports = router;