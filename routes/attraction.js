const express = require('express');
const router = express.Router();
const AttractionController = require('../controllers/attraction');

router.get('/', AttractionController.getAttractionDetail);
router.get('/getAll', AttractionController.getAllAttractions);
router.get('/getListInfo', AttractionController.getAttractionAndComments);


module.exports = router;
