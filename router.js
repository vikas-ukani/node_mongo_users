const express = require('express');
const UserController = require('./controllers/user.controller');
// route groups
const router = express.Router();

/** Web Routes */
router.get('/', UserController.getUsers);
router.get('/user-create', UserController.createUser);
router.post('/user-create', UserController.storeUser);
router.get('/user-edit/:_id', UserController.editUser);
router.post('/user-update', UserController.updateUser);



module.exports = router