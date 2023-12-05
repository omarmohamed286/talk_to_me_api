const User = require("../models/user_model");

exports.getUser = async (req, res) => {
  const token = req.headers.authorization;
  const user = await User.getUserByToken(token);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const token = req.headers.authorization;
  const user = await User.getUserByToken(token);
  await User.findByIdAndDelete(user._id);
  res.json({
    message: "User deleted succefully",
  });
};

exports.updateUser = async (req, res) => {
  const token = req.headers.authorization;
  const user = await User.getUserByToken(token);
  if (req.body.username) {
    await User.findByIdAndUpdate(user.id, {
      username: req.body.username,
    });
    res.json({
      message: "User updated succefully",
      user,
    });
  }
  if (req.body.email) {
    await User.findByIdAndUpdate(
      user.id,
      {
        email: req.body.email,
      },
      { new: true }
    );
    res.json({
      message: "User updated succefully",
      user,
    });
  }
  if (req.body.password) {
    const hashedPassword = await User.hashPassword(req.body.password);
    await User.findByIdAndUpdate(user.id, {
      password: hashedPassword,
    });
    res.json({
      message: "User updated succefully",
    });
  }
};
