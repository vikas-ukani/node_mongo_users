"use strict"
const User = require('../models/user.model');

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


exports.getUsers = async (req, res) => {
  const filter = {};
  const users = await User.find(filter);
  res.render('user/index', {
    title: "Users List",
    users: users
  });
};

exports.createUser = async (req, res) => {
  res.render('user/create', {
    title: "Create An User",
    error: '',
    cities: defaultCities
  });
};

// Create a user
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

exports.editUser = (req, res) => {
  const { _id } = req.params
  if (!_id) return res.redirect('/')

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

// Update a user
exports.updateUser = (req, res) => {
  var user = { ...req.body }

  User.updateOne({_id: user._id},
    user,
    function (err, docs) {
      if (err) {
        var data = {
          title: "Update An User",
          user: user,
          error: err.message,
          cities: defaultCities,
        }
        res.render('user/edit', data)
      }
      else res.redirect('/user/' + req.params.id);
    }
  );
}
