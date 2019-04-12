import * as Errors from "restify-errors";
import db from "../../../database/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateCaptcha } from "../../validators/validators";

const invalidResponse = (res, message) => {
  res.send(new Errors.UnprocessableEntityError(message));
};
export default async (req, res, next) => {
  const { email, password, captcha } = req.body;
  // Check Captcha
  const validCaptcha = await validateCaptcha(captcha);
  if (validCaptcha.error) {
    invalidResponse(res, "Captcha is invalid. Please try again.");
    return next();
  }

  try {
    // Check if a user with that email exists
    const loggedUser = await db("users")
      .select("*")
      .where("email", email);

    if (loggedUser.length == 0) {
      invalidResponse(res, "Invalid email or password.");
      return next();
    }

    // Check Password
    const matchPassword = await bcrypt.compare(password, loggedUser[0].hash);
    if (!matchPassword) {
      invalidResponse(res, "Invalid email or password.");
      return next();
    }

    // Create A Token
    const newToken = await jwt.sign(
      { ...loggedUser[0], hash: undefined },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h"
      }
    );
    res.json({ code: 200, token: newToken });
    return next();
  } catch (ex) {
    res.send(new Errors.InternalServerError(ex.message));
  }
  return next();
};
