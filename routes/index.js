const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const jwt = require("../helpers/jwt");
const Role = require("../helpers/role");

// Routes
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/admin/users", jwt(Role.Admin), userController.getAllAdminUsers);
router.get("/profile", jwt(), userController.getProfile);

module.exports = router;