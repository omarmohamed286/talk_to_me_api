const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

const jwtSecret = "17777";
const saltRounds = 7;

const signJwt = util.promisify(jwt.sign);
const verifyJwt = util.promisify(jwt.verify);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function () {
  const currentUser = this;
  if (currentUser.isModified("password")) {
    currentUser.password = await bcrypt.hash(currentUser.password, saltRounds);
  }
});

userSchema.statics.hashPassword = async function (plainPassword) {
  return await bcrypt.hash(plainPassword, saltRounds);
};

userSchema.methods.checkPassword = function (plainPassword) {
  const currentUser = this;
  return bcrypt.compare(plainPassword, currentUser.password);
};

userSchema.methods.generateToken = function () {
  const currentUser = this;
  return signJwt(
    {
      id: currentUser.id,
    },
    jwtSecret
  );
};

userSchema.statics.getUserByToken = async function (token) {
  const User = this;
  try {
    const { id } = await verifyJwt(token, jwtSecret);
    const user = await User.findById(id).select("-__v -password");
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("User", userSchema);
