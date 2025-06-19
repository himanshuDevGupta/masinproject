const userServices = require("../services/user.services");
const Role = require("../helpers/role");
const { registerSchema, loginSchema } = require("../validatations/registerValidation");


exports.login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }
  userServices
    .authenticate(req.body)
    .then((user) => {
      console.log(user);
      user
        ? res.json({ user: user, message: "User logged in successfully" })
        : res.status(400).json({ message: "Username or password is incorrect." });
    })
    .catch((error) => next(error));
};

exports.register = async (req, res, next) => {
  // Validate input using Joi
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }

  try {
    const user = await userServices.create(req.body);
    res.json({
      user: user,
      message: `User Registered successfully with email ${req.body.email}`,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAdminUsers = (req, res, next) => {
  const currentUser = req.user;

  if (currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Not Authorized!" });
  }
  let query = { role: { $ne: "Admin" } };
  userServices
    .getAll(query)
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

exports.getProfile = (req, res, next) => {
  userServices
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.status(404)))
    .catch((error) => next(error));
};