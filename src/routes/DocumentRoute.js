const express =require('express');
const router= express.Router();
const DocumentController = require('../app/controllers/DocumentController');
const auth = require('../app/middleware//auth')


router.post('/',DocumentController.createOne);




module.exports=router;