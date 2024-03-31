const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../middleware/authMiddleware");
const { addImage } = require("./imageController");
const imageModel = require("../models/imageModel");
const { authCookieName } = require("../config/cookie");

//@desc create new user
//@route POST api/users
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  console.log(name);
  console.log(email);
  console.log(password);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Username, email or password not entered");
  }

  //check id user exists
  const userExists = await User.findOne({ $or: [{ name }, { email }] });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(password, salt);

  const icon = await addImage(req.body.icon);

  //TODO create user
  const user = await User.create({
    name,
    email,
    password: hashedPass,
    icon,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      icon: image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc log in user
//@route POST api/users/login
//@access public
const logInUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  //check for user
  const user = await User.findOne({ $or: [{ name: name }, { email: name }] });

  if (user && (await bcrypt.compare(password, user.password))) {
    const image = await imageModel.findById(user.icon);
    const token = generateToken(user._id);

    res
      .cookie(authCookieName, token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        _id: user.id,
        name: user.name,
        token: token,
        icon: image,
      });
  } else {
    res.status(400);
    throw new Error("Wrong username or password");
  }

  res.json({ message: `logged in user ${user.name}` });
});

//@desc get all users
//@route GET api/users
//@access private
const checkUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("_id");

  res.status(200).json(users.map((userId) => userId._id));
});

//@desc check user
//@route GET api/users/:userId
//@access private
const checkUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const image = await imageModel.findById(user.icon);
  res.status(200).json({
    id: user._id,
    name: user.name,
    icon: image ? image.file : undefined,
  });
});

//@desc check current user
//@route GET api/users/me
//@access private
const checkMe = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  userModel
    .findOne({ _id: userId }, { password: 0, __v: 0 })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch();
});

module.exports = { createUser, logInUser, checkUsers, checkUser, checkMe };
