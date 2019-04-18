import * as Errors from "restify-errors";
import db from "../../../database/index";
import bcrypt from "bcryptjs";
import shortid from "shortid";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateCaptcha
} from "../../validators/validators";

function invalidResponse(res, message) {
  res.send(new Errors.UnprocessableEntityError(message));
}

export default async (req, res, next) => {
  try {
    /* ==== Validate User ====
    ________________________________*/
    const { username, email, password, captcha } = req.body;
    // // Validate Username
    const isValidUserName = validateUsername(username);
    if (isValidUserName.error) {
      invalidResponse(res, isValidUserName.errorMessage);
      return next();
    }
    // Validate Email
    const isValidEmail = await validateEmail(email);
    if (isValidEmail.error) {
      invalidResponse(res, isValidEmail.errorMessage);
      return next();
    }
    // Validate Captcha
    const isValidCaptcha = await validateCaptcha(captcha);
    if (isValidCaptcha.error) {
      invalidResponse(res, isValidCaptcha.errorMessage);
      return next();
    }
    // Validate Password
    const isValidPass = validatePassword(password);
    if (isValidPass.error) {
      invalidResponse(res, isValidPass.errorMessage);
      return next();
    }
    // Check if user already exists
    const existUser = await db("users")
      .select("*")
      .where("email", email);
    if (existUser.length !== 0) {
      res.send(
        new Errors.BadRequestError("A user with that email already exists!")
      );
      return next();
    }
    /* ==== REGISTER USER ====
  ________________________________*/
    // Create Hash
    const hash = await bcrypt.hash(password, 12);
    const newUser = {
      _id: shortid.generate(),
      username,
      email,
      title: "",
      hash,
      followers: JSON.stringify([])
    };
    // Generate New User
    const register = await db("users").insert(newUser);
    // Send A Response
    res.json({
      code: 200,
      message: "New user created successfully!"
    });
  } catch (ex) {
    res.send(new Errors.InternalServerError(ex.message));
  }
  return next();
};
