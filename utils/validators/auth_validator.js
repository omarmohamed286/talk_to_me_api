const { check } = require("express-validator");
const validatorMW = require("../../middlewares/validatorMW");
const User = require("../../models/user_model");

exports.registerValidator = [
  check("username").notEmpty().withMessage("username is required"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("user already exists");
      }
    }),
  check("password").notEmpty().withMessage("password is required"),
  validatorMW,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("user with this email doesn't exist");
      }
    }),

  check("password").notEmpty().withMessage("password is required"),
  validatorMW,
];
