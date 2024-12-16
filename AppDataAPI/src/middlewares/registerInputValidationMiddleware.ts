import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { CustomError } from "../types/errorTypes.js";

const registerInputValidation = {
  validateUsername() {
    return [
      body("username")
        .exists({ checkFalsy: true })
        .isAlphanumeric()
        .withMessage("Username must contain only letters and numbers.")
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters long")
        .custom(async (value) => {
          if (
            value === process.env.TEST_USERNAME_1 ||
            value === process.env.TEST_USERNAME_2
          ) {
            throw new CustomError("Username unavailable");
          }
        }),
    ];
  },

  validatePassword() {
    return [
      body("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
        .matches(/\d/)
        .withMessage("Password must contain at least one number.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[\W_]/)
        .withMessage("Password must contain at least one special character.")
        .custom(async (value) => {
          if (
            value === process.env.TEST_PASSWORD_1 ||
            value === process.env.TEST_PASSWORD_2
          ) {
            throw new CustomError("Password unavailable");
          }
        }),
    ];
  },

  validateEmail() {
    return [
      body("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .custom(async (value) => {
          if (
            value === process.env.TEST_EMAIL_1 ||
            value === process.env.TEST_EMAIL_2
          ) {
            throw new CustomError("Email unavailable", 400);
          }
        }),
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

  checkPayloadSignIn(req: Request, next: NextFunction) {
    if (!req.body.username || !req.body.password || !req.body.email) {
      next(new CustomError("Invalid Payload", 400));
    }
  },

  checkPayloadLogIn(req: Request, next: NextFunction) {
    if (!req.body.username || !req.body.password) {
      next(new CustomError("Invalid Payload", 400));
    }
  },

  validateSignIn: (req: Request, res: Response, next: NextFunction) => [
    registerInputValidation.checkPayloadSignIn(req, next),
    registerInputValidation.validateUsername(),
    registerInputValidation.validatePassword(),
    registerInputValidation.validateEmail(),
    registerInputValidation.result(req, res, next),
  ],

  validateLogIn: (req: Request, res: Response, next: NextFunction) => [
    registerInputValidation.checkPayloadLogIn(req, next),
    registerInputValidation.validateUsername(),
    registerInputValidation.validatePassword(),
    registerInputValidation.result(req, res, next),
  ],
};

export default registerInputValidation;
