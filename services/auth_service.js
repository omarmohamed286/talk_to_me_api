const User = require("../models/user_model");
const asyncHandler = require("express-async-handler");

exports.registerService = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  const createdUser = await User.create({
    username,
    password,
    email,
    image: `https://robohash.org/${Math.floor(Math.random() * 100000 + 1)}.png`,
  });
  res.json({
    message: "user was registered succefully",
    user: createdUser.username,
  });
});

exports.loginService = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
  });
  const isMatch = await user.checkPassword(password);
  if (isMatch) {
    const token = await user.generateToken();
    res.json({ message: "loged in succefully", user: user.username, token });
  } else {
    res.json({ message: "wrong password" });
  }
});
