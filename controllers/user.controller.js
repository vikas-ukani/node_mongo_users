"use strict"
const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  const filter = {};
  const users = await User.find(filter);
  res.render('user/index', {
    title: "Users List",
    users: users
  });

  // var users = [{
  //   name: "Vikas",
  //   email: "email@eail",
  //   mobile: 11315132151,
  //   city: "Surat",
  // }]
  // let users = await User.find();
  // User.find({}, function (err, users) {
  //   var userMap = {};
  //   console.log('users::', users );
  //   users.forEach(function (user) {
  //     userMap[user._id] = user;
  //   });
  //   console.log('users', users);
  //   res.render('user/index', {
  //     title: "Users List",
  //     users: userMap
  //   });
  // });

};

// create a new Blog Post
exports.createUser = (req, res) => {
  const NewUser = new User(req.body);
  NewUser.save((err, User) => {
    if (err) {
      return res.status(422).json({
        msg: 'Server encountered an error while creating an user.',
        error: err
      });
    }
    else {
      return res.status(200).json({
        msg: 'Successfully user created.',
        User: User
      });
    }
  });
};