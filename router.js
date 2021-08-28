const express = require('express');
const UserController = require('./controllers/user.controller');
// route groups
const router = express.Router();

// Create New User Route
router.get('/', UserController.getUsers);
router.post('/user/store', UserController.createUser);
router.get('/user/create', (req, res) => {
    res.render('user/create', {
        title: "Create User",
        name: req.session.name,
    });
});

module.exports = router