"use strict"
const User = require('../models/user.model');

/** Default cities for dropdown */
var defaultCities = [
  {
    id: 1,
    name: "Pune"
  },
  {
    id: 2,
    name: "Bangloure"
  },
  {
    id: 2,
    name: "Vapi"
  },
  {
    id: 4,
    name: "Nadiyad"
  },
]

// Get all available users 
exports.getUsers = async (req, res) => {
  const filter = {};
  const users = await User.find(filter);
  res.render('user/index', {
    title: "Users List",
    users: users
  });
};

// User create form
exports.createUser = async (req, res) => {
  res.render('user/create', {
    title: "Create An User",
    error: '',
    cities: defaultCities
  });
};

// Create a new user
exports.storeUser = (req, res) => {
  console.log('req.body::', req.body);
  const NewUser = new User(req.body);
  NewUser.save((err, User) => {
    if (err) {
      var data = {
        title: "Create An User",
        cities: defaultCities,
        error: err.message
      }
      res.render('user/create', data)
    }
    else {
      res.redirect('/')
    }
  });
};


// User Editing
exports.editUser = (req, res) => {
  const { _id } = req.params
  if (!_id) return res.redirect('/')


  // find user by _id
  User.findById(_id, function (err, docs) {
    if (err) return res.redirect('/')
    else {
      var data = {
        title: "Update An User",
        user: docs,
        error: '',
        cities: defaultCities,
      }
      res.render('user/edit', data)
    }
  });
}

// Update a user by _id
exports.updateUser = async (req, res) => {
  var user = { ...req.body }

  User.updateOne({ _id: user._id },
    user,
    function (err, docs) {
      res.redirect('/user-edit/' + req.params.id);
    }
  );
}
