const express = require('express');
const router = express.Router();
const gigController = require('../controller/gig.controller');


router.get('/', gigController.get);
router.get('/add', gigController.display);
router.post('/add', gigController.create);
router.get('/search', gigController.search);

module.exports = router; 