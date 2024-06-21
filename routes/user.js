const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();

router.post('/signup',userController.addPostUser);

module.exports = router;