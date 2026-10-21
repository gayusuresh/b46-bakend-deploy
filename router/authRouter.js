const express = require("express");
const router = express.Router();
const authController = require("../Security/authSecurity");
router.post("/register", authController.registerAPI);
router.post("/login", authController.loginApi);

module.exports = router;
