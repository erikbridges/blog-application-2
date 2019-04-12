import * as Errors from "restify-errors";
import db from "../../../database/index";
const invalidResponse = (res, message) => {
  res.send(new Errors.UnauthorizedError(message));
};
export default async (req, res, next) => {
  const { username, email } = req.user;
  try {
    // Check if a user with that email exists
    const loggedUser = await db("users")
      .select("*")
      .where("email", email)
      .andWhere("username", username);

    if (loggedUser.length == 0) {
      invalidResponse(res, "User is not created yet.");
      return next();
    }
    res.json({ code: 200, ...loggedUser[0], hash: undefined });
    return next();
  } catch (ex) {
    console.log(ex.message);
    res.send(new Errors.InternalServerError(ex.message));
  }
  return next();
};
