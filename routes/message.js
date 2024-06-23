const express = require('express');

const mesageController = require('../controllers/messageController');
const userAuth = require('../middleware/userAuth');


const router = express.Router();

router.get('/get-messages',userAuth,mesageController.getMessages);

router.post('/send-message', userAuth,mesageController.sendMessage);

router.get('/get-group-messages',userAuth,mesageController.getGroupMessages);

module.exports = router;