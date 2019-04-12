import db from "../../../database/index";
import {
  validateEmail,
  validatePassword,
  validateUsername
} from "../../validators/validators";
import * as Errors from "restify-errors";
import bcrypt from "bcryptjs";

export default async (req, res, next) => {
  const { editWhich, username, email, password } = req.body;
  switch (editWhich) {
    case "username": {
      // Validate User
      const isValidUser = validateUsername(username);
      if (isValidUser.error) {
        res.send(new Errors.UnprocessableEntityError(isValidUser.errorMessage));
        return next();
      }
      // Validate User
      const changeUser = await db("users")
        .update({
          username: username
        })
        .where("_id", req.user._id)
        .returning("*");

      // Check User Edit
      if (changeUser.length == 0) {
        res.send(new Errors.InternalError("Failed to update username."));
        return next();
      }

      res.json({
        code: 200,
        success: true,
        message: "Username updated successfully"
      });

      return next();
    }
    case "email": {
      // Validate Email
      const isValidEmail = await validateEmail(email);
      if (isValidEmail.error) {
        res.send(
          new Errors.UnprocessableEntityError(isValidEmail.errorMessage)
        );
        return next();
      }

      // Edit Email
      const changeEmail = await db("users")
        .update({
          email
        })
        .where("_id", req.user._id)
        .returning("*");

      // Check Email Edit
      if (changeEmail.length == 0) {
        res.send(new Errors.InternalError("Failed to update password."));
        return next();
      }

      res.json({
        code: 200,
        success: true,
        message: "Email updated successfully"
      });

      return next();
    }
    case "password": {
      // Validate Password
      const isValidPass = validatePassword(password);
      if (isValidPass.error) {
        res.send(new Errors.UnprocessableEntityError(isValidPass.errorMessage));
        return next();
      }

      // Hash it
      const hash = await bcrypt.hash(password, 12);

      // Change Password
      const changePass = await db("users")
        .update({
          hash
        })
        .where("_id", req.user._id)
        .returning("*");

      // Check Password Edit
      if (changePass.length == 0) {
        res.send(new Errors.InternalError("Failed to update password."));
        return next();
      }

      res.json({
        code: 200,
        success: true,
        message: "Password Changed Successfully"
      });

      return next();
    }
    default: {
      res.send(
        new Errors.BadRequestError(
          "No edit specified or invalid edit parameter."
        )
      );
      return next();
    }
  }
};
