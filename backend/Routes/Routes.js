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

module.exports = router;