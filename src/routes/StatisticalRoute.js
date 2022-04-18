const express = require('express');
const router= express.Router();
const auth = require('../app/middleware/auth')
const StatisticalController = require('../app/controllers/StatisticalController');
router.post('/all',auth,StatisticalController.showAll);



module.exports =router;