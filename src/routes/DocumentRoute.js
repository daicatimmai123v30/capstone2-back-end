const express =require('express');
const router= express.Router();
const DocumentController = require('../app/controllers/DocumentController');
const auth = require('../app/middleware//auth')

router.get('/:id',DocumentController.findById);
router.post('/',DocumentController.createOne);
router.get('/',DocumentController.find);




module.exports=router;