const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();

router.post('/signup',userController.addPostUser);

router.post('/login', userController.postLoginUser);

module.exports = router;