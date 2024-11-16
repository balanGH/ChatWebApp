const express = require('express');
const { login } = require('../controllers/authController');
const { getChatUsers } = require('../controllers/messagesController.js');
const { getGroups } = require('../controllers/getGroups.js');
const { getChat,sendMessage } = require('../controllers/getChat.js'); // Import the chat users controller
const { getGroupChat,sendGroupChat } = require('../controllers/getGroupChat.js');
const { searchUsers } = require('../controllers/searchUsers.js');
const { getUserFnds } = require('../controllers/getUserFnds');

const router = express.Router();

// Login route
router.post('/login', login);

// Chat users route
router.get('/messages/:id', getChatUsers);
router.get('/getGroups/:id', getGroups);
router.get('/chat/:id/:oid', getChat);
router.get('/getGroupChat/:id/:gid', getGroupChat);
router.get('/searchUsers', searchUsers);
router.post('/chat/send', sendMessage);
router.post('/getGroupchat/send', sendGroupChat);
router.get('/getUserFnds/:id', getUserFnds); 





module.exports = router;
