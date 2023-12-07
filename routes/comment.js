const express = require('express');
const router = express.Router();
const controller = require('../controllers/comments');
const { verifyToken, userCanEdit } = require('../middlewares/auth');

router.get('/', controller.getComments);
router.post('/add', verifyToken, controller.addComment);
router.get('/updateStatus', controller.updateStatus);
module.exports = router;
