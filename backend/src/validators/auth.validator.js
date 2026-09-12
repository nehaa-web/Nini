import { body, validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
}

export const registerValidator = [
    // Username
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")

    .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")

    .matches(/^[a-zZ-Z0-9_]+$/).withMessage("Uername can only contail "),

// Email
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid eamil"),

    // Password
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min : 6}).withMessage("Password must be at least 6 characters"),

    validate

];

export const loginValidator = [

// Email
    body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid eamil"),

    // Password
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min : 6}).withMessage("Password must be at least 6 characters"),

    validate

];