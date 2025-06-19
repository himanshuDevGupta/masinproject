const Joi = require("joi");
const Role = require("../helpers/role");

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$")
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      }),
    role: Joi.string().valid(Role.Admin, Role.User, Role.Legal, Role.PM, Role.Sales).required(),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$")
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      }),
});


module.exports = { registerSchema, loginSchema };
  