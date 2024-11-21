import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const registerInputValidation = {
  validateUsername() {
    return [
      body("username")
        .isAlphanumeric()
        .withMessage("Username must contain only letters and numbers.")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters long"),
    ];
  },

  validatePassword() {
    return [
      body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
        .matches(/\d/)
        .withMessage("Password must contain at least one number.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[\W_]/)
        .withMessage("Password must contain at least one special character."),
    ];
  },

  validateEmail() {
    return [
      body("email")
        .isEmail()
        .withMessage("Please provide a valid email address."),
    ];
  },

  result(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
    return;
  },

  validateSignIn(req: Request, res: Response, next: NextFunction) {
    return [
      this.validateUsername(),
      this.validatePassword(),
      this.validateEmail(),
      this.result(req, res, next),
    ];
  },

  validateLogIn(req: Request, res: Response, next: NextFunction) {
    return [
      this.validateUsername(),
      this.validatePassword(),
      this.result(req, res, next),
    ];
  },
};

export default registerInputValidation;
