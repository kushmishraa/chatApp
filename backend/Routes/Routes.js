const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get("/", (req, res) => {
    res.status(200).send("working").end();
})

router.post('/registerUser', (req, res) => {
    userController.registerUser(req, res);
});

router.post('/validateUser', (req, res) => {
    userController.validateUser(req, res);
})

router.patch('/resetpassword', (req, res) => {
    userController.resetPassword(req, res);
})

router.post('/searchUsers', (req, res) => {
    userController.searchUsers(req, res);
});

router.post('/addFriend', (req, res) => {
    userController.addFriend(req, res)
})

router.post('/handleFriendRequest', (req,res)=>{
    userController.handleFriendRequest(req,res);
})

module.exports = router;