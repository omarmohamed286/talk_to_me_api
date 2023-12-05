const express = require("express");
const { registerService ,loginService} = require("../services/auth_service");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/auth_validator");

const router = express.Router();

router.post("/register", registerValidator, registerService);
router.post("/login", loginValidator, loginService);

module.exports = router;
