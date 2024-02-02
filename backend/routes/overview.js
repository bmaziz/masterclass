const express = require('express');
const router =express.Router();
const overviewController= require('../controllers/overview');

router.get('/',overviewController.getoverview);

module.exports= router;