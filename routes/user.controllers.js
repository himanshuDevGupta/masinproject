const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const jwt = require("../helpers/jwt");
const Role = require("../helpers/role");

// Routes
router.post("/login", userController.authenticate);
router.post("/register", userController.register);
router.get("/admin/users", jwt(Role.Admin), userController.getAll);
router.get("/profile", jwt(), userController.getCurrent);

module.exports = router;